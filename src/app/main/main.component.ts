import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { UserModel } from '../models/user.model';
import { CoursesService } from '../services/courses.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  courses: CourseModel[];
  favoriteCourse: CourseModel;

  user: UserModel;

  isOrg:boolean;

  constructor(private coursesService: CoursesService, private usersService:UsersService) {

   }

   ngOnInit(): void {
    this.isOrg=this.usersService.getLoggedUser()?.isOrg;

     this.coursesService.getAll$().subscribe({
      next:(response:CourseModel[])=>{
        this.courses = response;
      }
     });
   }

   onItemClick(course: CourseModel): void {
     this.favoriteCourse = course;
   }
   onItemDeleted(id:number):void{
    this.coursesService.delete$(id).subscribe({
      next:()=>{
        this.courses = this.courses.filter(c=>c.id!==id);
      }
    });
   }
   onUserClick(user: UserModel): void {
    this.user = user;
  }
}
