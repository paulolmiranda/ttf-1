import {
  SkipSelf,
  Optional,
  Component,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ContextProviderComponent } from '../context-provider/context-provider.component';

@Component({
  selector: '[contextConsumer]',
  templateUrl: './context-consumer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ContextConsumerComponent {
  private component: any;

  constructor(
    @Optional() @SkipSelf() private target: ChangeDetectorRef,
    @Optional() @SkipSelf() private providerComponent: ContextProviderComponent
  ) {
    this.component =
      (this.target as any)['_view']?.component ||
      (this.target as any)['context'];

    this.component['contextProvider'] = this.providerComponent.contextProvider;
  }
}
