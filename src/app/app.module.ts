import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import {MessagesService} from './message/messages.service';
import {ThreadsService} from './thread/threads.service';
import {UsersService} from './user/users.service';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {FromNowPipe} from './pipes/from-now.pipe';
import {FormsModule} from '@angular/forms';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    FromNowPipe,
    ChatNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MessagesService,
    ThreadsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
