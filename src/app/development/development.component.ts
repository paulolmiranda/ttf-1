import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';

import { ContextProvider } from '../context';
import { Development, Message } from '../app.component';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss'],
})
export class DevelopmentComponent implements OnInit, OnDestroy {
  @Input() development?: Development;
  
  protected countMessage?: number;
  
  private unsubscribe$ = new Subject();

  private contextProvider?: ContextProvider;

  ngOnInit(): void {
    this.contextProvider
      ?.select((context: any) => context.messages)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((messages: Message[]): number => {
          return (messages || []).filter(
            (item: Message) => item.to === this.development?.id
          ).length;
        })
      )
      .subscribe((count: number) => (this.countMessage = count));
  }

  public onCopy(): void {
    const { id } = this.development || {};
    navigator.clipboard.writeText(`${id}`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
