import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
formGroup:FormGroup;
user:UserModel;

  constructor(private fb:FormBuilder, private usersService:UsersService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.buildForm();
    const userID =this.route.snapshot.params.userID;
    if(userID){
      this.usersService.getById$(userID).subscribe({
        next:(response:UserModel)=>{
          this.user = response;
          this.buildForm();
        }
      });
    }
  }

  onSubmit(): void{
    
    const data = {
      ...this.formGroup.value
    }

    if(data.userID ){
      this.usersService.put$(data).subscribe({
        next:()=>{
         // this.router.navigate(['/list']);
         localStorage.removeItem('loggedUser');
         location.reload();
        }
      })
    }
    else{this.usersService.post$(data).subscribe({
      next:()=>{
        //navigate back to list
        this.router.navigate(['/list'])
        //localStorage.removeItem('loggedUser');
      }
    });
    }
  } 
  private buildForm():void{
    this.formGroup = this.fb.group({
      userID:this.user?.userID,
      username:[this.user?.username,[Validators.required]],
      password:this.user?.password,
      email:this.user?.email,
      isOrg:this.user?.isOrg,
    });
  }
}
