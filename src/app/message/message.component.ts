import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroupDirective,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

import * as AppAction from '../app.actions';
import { ContextProvider } from '../context';
import { Sender, Message } from '../app.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  protected connect?: boolean;

  protected messages: Message[] = [];

  protected messageForm: UntypedFormGroup;

  private unsubscribe$ = new Subject();

  private contextProvider?: ContextProvider;

  @Input() sender?: Sender;

  constructor() {
    this.messageForm = new UntypedFormBuilder().group({
      to: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.contextProvider
      ?.select((context: any) => context.messages)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((messages: Message[]): Message[] => {
          return (messages || []).filter(
            (item: Message) => item.to === this.sender?.id
          );
        })
      )
      .subscribe((messages: Message[]) => (this.messages = messages));
  }

  protected onSend(form: FormGroupDirective): void {
    const { value, invalid } = this.messageForm;

    if (invalid) {
      return;
    }

    const message = {
      sender: this.sender,
      at: new Date(),
      ...value,
    }

    this.contextProvider?.dispatch(AppAction.addMessage(message));
    this.contextProvider?.dispatch({ key: 'message', value: message });
    this.contextProvider?.dispatch({ key: 'sender', value: this.sender });

    form.resetForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
