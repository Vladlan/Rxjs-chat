import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {User} from '../user/user.model';
import {Message} from '../message/message.model';
import {UsersService} from '../user/users.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public UsersService: UsersService) { }

  ngOnInit(): void {
    this.UsersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.id !== user.id;
          }
        }
      );
  }

}
