import { Component, Input, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';

import { Message, ProductManager } from '../app.component';
import { ContextProvider } from '../context/context-provider/context-provider.component';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss'],
})
export class ProductManagerComponent implements OnInit {
  protected countMessage?: number;

  private unsubscribe$ = new Subject();

  private contextProvider?: ContextProvider;

  @Input() productManager?: ProductManager;

  ngOnInit(): void {
    this.contextProvider
      ?.select((context: any) => context.messages)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((messages: Message[]): number => {
          return (messages || []).filter(
            (item: Message) => item.to === this.productManager?.id
          ).length;
        })
      )
      .subscribe((count: number) => (this.countMessage = count));
  }

  public onCopy(): void {
    const { id } = this.productManager || {};
    navigator.clipboard.writeText(`${id}`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
