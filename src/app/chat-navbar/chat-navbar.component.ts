import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../message/messages.service';
import {ThreadsService} from '../thread/threads.service';
import {Thread} from '../thread/thread.model';
import {Message} from '../message/message.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    this.messagesService.messages
      .combineLatest(
        this.threadsService.currentThread, (messages: Message[], currentThread: Thread) =>
          [currentThread, messages] )

      .subscribe(( [currentThread, messages]: [Thread, Message[]] ) => {
        this.unreadMessagesCount = _.reduce(
          messages, (sum: number, m: Message) => {
            const messageIsInCurrentThread: boolean = m.thread &&
              currentThread && (currentThread.id === m.thread.id);
            // in real app messages of current user should be excluded b/c they have already been read
            if (m && !m.isRead && !messageIsInCurrentThread) {
              sum = sum + 1;
            }
            return sum;
          }, 0);
      });
  }
}
