import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user:UserModel;
  @Output() clicked: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  @Output() deleted:EventEmitter<number> = new EventEmitter<number>();

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit(this.user);
  }
  onUserDelete():void{
    this.deleted.emit(this.user.userID)
  }
}
