import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { SquadComponent } from './squad.component';
import { DevelopmentModule } from '../development/development.module';
import { ProductManagerModule } from '../product-manager/product-manager.module';

@NgModule({
  exports: [SquadComponent],
  declarations: [SquadComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    DevelopmentModule,
    ProductManagerModule,
  ],
})
export class SquadModule {}
