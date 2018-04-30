import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import {Thread} from './thread.model';
import {Message} from '../message/message.model';
import {MessagesService, messagesServiceInjectables} from '../message/messages.service';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ThreadsService {

  // 'threads' is an observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;
  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;
  // `currentThread contains the currently selected thread
  currentThread: Subject<Thread> = new BehaviorSubject(<Thread>(new Thread());
  // `currentThreadMessages` contains the set of messages for currently selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;

          const messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        console.log(threads);
        // { t1: {
        //    avatarSrc: string,
        //           id: string,
        //  lastMessage: {id, isRead, sentAt, text, thread },
        //         name: string
        // },
        //   t2: {...}
        // }
        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      });


    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
        (currentThread: Thread, messages: Message[]) => {
          if (currentThread && messages.length > 0) {
            return _.chain(messages)
              .filter((message: Message) => ( message.thread.id === currentThread.id))
              .map((message: Message) => {
              message.isRead = true;
              return message; }).value();
          } else {
            return [];
          }
        });

    this.currentThread.subscribe(messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}
