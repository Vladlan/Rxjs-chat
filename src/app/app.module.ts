import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { User } from './user/user.model';
import { Thread } from './thread/thread.model';
import {Message} from "./message/message.model";


@NgModule({
  declarations: [
    AppComponent,
    User,
    Thread,
    Message
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
