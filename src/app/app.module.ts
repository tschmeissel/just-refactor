import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RefactorWithChrisPowersComponent } from './refactor-with-chris-powers/refactor-with-chris-powers.component';

@NgModule({
  declarations: [
    AppComponent,
    RefactorWithChrisPowersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
