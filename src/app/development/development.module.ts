import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

import { MessageModule } from '../message/message.module';
import { ContextModule } from '../context/context.module';
import { DevelopmentComponent } from './development.component';

@NgModule({
  exports: [DevelopmentComponent],
  declarations: [DevelopmentComponent],
  imports: [
    CommonModule,
    MessageModule,
    ContextModule,
    MatBadgeModule,
    MatButtonModule,
  ],
})
export class DevelopmentModule {}
