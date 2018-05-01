/* tslint:disable:max-line-length */
import {User} from '../user/user.model';
import {Thread} from '../thread/thread.model';
import {Message} from '../message/message.model';
import {MessagesService} from '../message/messages.service';
import {ThreadsService} from '../thread/threads.service';
import {UsersService} from '../user/users.service';
import * as moment from 'moment';

// the person using the app us Juliet
const me: User = new User('Me', 'assets/avatars/user-avatar-main-picture.svg');
const winston: User = new User('Winston Churchill', 'assets/avatars/winston-churchill.svg');
const echo: User = new User('Echo Bot', 'assets/avatars/abraham-lincoln.svg');
const rev: User = new User('Reverse Bot', 'assets/avatars/user-avatar-main-picture.svg');
const wait: User = new User('Waiting Bot', 'assets/avatars/user-avatar-main-picture.svg');

const tWinston: Thread = new Thread('tWinston', winston.name, winston.avatarSrc);
const tEcho: Thread = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread = new Thread('tWait', wait.name, wait.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Winston, what do I have to do with my way?',
    thread: tWinston
  }),
  new Message({
    author: winston,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'If you’re going through hell, keep going. That is all. Sorry, I have to go, bye!',
    thread: tWinston
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messagesService: MessagesService,
              threadsService: ThreadsService,
              UsersService: UsersService): void {

    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Me" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map((message: Message) => messagesService.addMessage(message));

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: MessagesService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: echo,
              text: message.text,
              thread: tEcho
            })
          );
        },
        null);


    // reverse bot
    messagesService.messagesForThreadUser(tRev, rev)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: rev,
              text: message.text.split('').reverse().join(''),
              thread: tRev
            })
          );
        },
        null);

    // waiting bot
    messagesService.messagesForThreadUser(tWait, wait)
      .forEach((message: Message): void => {

          let waitTime: number = parseInt(message.text, 10);
          let reply: string;

          if (isNaN(waitTime)) {
            waitTime = 0;
            reply = `I didn\'t understand ${message.text}. Try sending me a number`;
          } else {
            reply = `I waited ${waitTime} seconds to send you this.`;
          }

          setTimeout(
            () => {
              messagesService.addMessage(
                new Message({
                  author: wait,
                  text: reply,
                  thread: tWait
                })
              );
            },
            waitTime * 1000);
        },
        null);

  }
}
