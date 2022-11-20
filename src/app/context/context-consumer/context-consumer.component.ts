import {
  Input,
  OnInit,
  SkipSelf,
  Optional,
  Component,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { filter } from 'rxjs';

import { Context, ContextProviderComponent } from '../context-provider/context-provider.component';

@Component({
  selector: '[contextConsumer]',
  templateUrl: './context-consumer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ContextConsumerComponent implements OnInit {
  private component: any;

  @Input() consume: string[];

  constructor(
    @Optional() @SkipSelf() private target: ChangeDetectorRef,
    @Optional() @SkipSelf() private providerComponent: ContextProviderComponent
  ) {
    this.consume = [];
    this.component =
      (this.target as any)['_view']?.component ||
      (this.target as any)['context'];

    this.component['contextProvider'] = this.providerComponent.contextProvider;
  }

  ngOnInit(): void {
    this.providerComponent.dispatch.pipe(filter(() => this.consume.length !== 0)).subscribe((context: Context) => {
      this.consume.forEach((key: string) => (this.component[key] = context[key]));
      this.target.detectChanges();
    });
  }
}
