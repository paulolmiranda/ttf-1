import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

import { MessageModule } from '../message/message.module';
import { ContextModule } from '../context/context.module';
import { ProductManagerComponent } from './product-manager.component';

@NgModule({
  exports: [ProductManagerComponent],
  declarations: [ProductManagerComponent],
  imports: [CommonModule, MatButtonModule, MessageModule, ContextModule, MatBadgeModule],
})
export class ProductManagerModule {}
