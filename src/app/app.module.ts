import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContextModule } from './context';
import { AppComponent } from './app.component';
import { SquadModule } from './squad/squad.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  providers: [],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    SquadModule,
    ContextModule,
    BrowserModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
