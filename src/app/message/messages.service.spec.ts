import { MessagesService } from './messages.service';

import {Message} from './message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

describe('MessagesService', () => {
  it('should test', () => {
    const user: User = new User('Igor', '');
    const thread: Thread = new Thread('thread1', 'Igor', '');

    const m1: Message = new Message({
      author: user,
      text: 'Hello',
      thread: thread
    });

    const m2: Message = new Message({
      author: user,
      text: 'Good',
      thread: thread
    });

    const messagesService: MessagesService = new MessagesService();

    // listen to each message individually as it comes in
    messagesService.newMessages
      .subscribe((message: Message) => {
        console.log('=> newMessages: ' + message.text);
      });

    // listen to the stream of most current messages
    messagesService.messages
      .subscribe( (messages: Message[]) => {
        console.log('=> messages: ' + messages.length);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
  });

});
