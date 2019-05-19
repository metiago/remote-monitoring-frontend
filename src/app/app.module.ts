import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { ControlMessagesComponent } from "./control-messages.component";
import { ErrorInterceptor } from '../_services/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
