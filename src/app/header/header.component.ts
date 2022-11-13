import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedUser:UserModel;
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.loggedUser=this.usersService.getLoggedUser();
    this.usersService.loggedUser$.asObservable().subscribe({
      next:(user:UserModel)=>{
        this.loggedUser = user;
      }
    })
    return this.ngOnInit();
  }

  onLogout():void{
    this.usersService.logout();
  }

  onUserDeleted(userID:number):void{
    this.usersService.delete$(this.loggedUser.userID).subscribe();
    this.usersService.logout();
  }

}
