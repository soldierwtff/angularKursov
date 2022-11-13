import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private fb:FormBuilder,private usersService:UsersService,private router:Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }
  onSubmit():void{
    if(!this.formGroup.valid){
      return;
    }

    this.usersService.login$(this.formGroup.value.username, this.formGroup.value.password).subscribe({
      next:(user:UserModel)=>{
        localStorage.setItem('loggedUser',JSON.stringify(user));

        this.usersService.loggedUser$.next(user);
          
        this.router.navigate(['/list']);
      }
    })
  }
}
