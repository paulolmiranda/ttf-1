import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContextModule } from '../context';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
  imports: [
    FormsModule,
    CommonModule,
    ContextModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class MessageModule {}
