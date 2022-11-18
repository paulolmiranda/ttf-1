import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SquadModule } from './squad/squad.module';
import { ContextModule } from './context/context.module';

@NgModule({
  providers: [],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    SquadModule,
    ContextModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
