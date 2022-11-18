import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextProviderComponent } from './context-provider/context-provider.component';
import { ContextConsumerComponent } from './context-consumer/context-consumer.component';

@NgModule({
  imports: [CommonModule],
  exports: [ContextProviderComponent, ContextConsumerComponent],
  declarations: [ContextProviderComponent, ContextConsumerComponent],
})
export class ContextModule {}
