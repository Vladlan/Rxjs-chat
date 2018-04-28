import {Subject} from 'rxjs/Subject';
import {Message} from './message.model';
import {Thread} from '../thread/thread.model';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user.model';
import {Injectable} from '@angular/core';

const initialMessages: Message[] = [];

type IMessagesOperation = ( messages: Message[] ) => Message[];

@Injectable()
export class MessagesService {
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates
      .scan((messages: Message[], operation: IMessagesOperation) => {
      return operation(messages);
    },
      initialMessages)
      .publishReplay(1)
      .refCount();

    this.create
      .map( function (message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            if (message.thread.id === thread.id ) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        return (message.thread.id === thread.id ) && (message.author.id !== user.id);
      });
  }
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];