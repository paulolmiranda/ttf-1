import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroupDirective,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

import { Sender, Message } from '../app.component';
import { ContextProvider } from '../context/context-provider/context-provider.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
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

    const { messages = [] } = this.contextProvider?.value();

    const data = [
      ...messages,
      {
        sender: this.sender,
        at: new Date(),
        ...value,
      },
    ];

    this.contextProvider?.dispatch('messages', data);
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
