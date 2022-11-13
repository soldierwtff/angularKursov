import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import {ActivatedRoute, Router} from '@angular/router'
import { CourseModel } from '../models/course.model';
import { CategoryModel } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';
import { TypeModel } from '../models/type.model';
import { TypesService } from '../services/types.service';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup:FormGroup;
  course:CourseModel;
  categories: CategoryModel[];
  types:TypeModel[];

  constructor(private fb:FormBuilder,private coursesService:CoursesService,private router:Router, private route:ActivatedRoute, private categoriesService:CategoriesService,private typesService:TypesService) {

   }

  ngOnInit(): void {

    this.categoriesService.getAll$().subscribe({
      next:(response:CategoryModel[])=>{
        
        this.categories=response;
      }
    });

    this.typesService.getAll$().subscribe({
      next:(response:TypeModel[])=>{this.types=response;}
    })

    this.buildForm();
    const id =this.route.snapshot.params.id;

    if(id){
      this.coursesService.getById$(id).subscribe({
        next:(response:CourseModel)=>{
          this.course = response;
          this.buildForm();
        }
      });
    }
  }

  onSubmit(): void{

    const data = {
      ...this.formGroup.value,
      categoryId:parseInt(this.formGroup.value.categoryId)
    }

    if(data.id){
      this.coursesService.put$(data).subscribe({
        next:()=>{
          this.router.navigate(['/list']);
        }
      })
    }

    else{this.coursesService.post$(data).subscribe({
      next:()=>{
        //navigate back to list
        this.router.navigate(['/list'])
      }
    });
  } 
  }
  private buildForm():void{
    this.formGroup = this.fb.group({
      id:this.course?.id,
      name:[this.course?.name,[Validators.required]],
      description:this.course?.description,
      categoryId:this.course?.categoryId,
      typeId:this.course?.typeId
    });
  }
}
