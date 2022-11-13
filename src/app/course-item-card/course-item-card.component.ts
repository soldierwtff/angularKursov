import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-course-item-card',
  templateUrl: './course-item-card.component.html',
  styleUrls: ['./course-item-card.component.scss']
})
export class CourseItemCardComponent implements OnInit{

  @Input() course: CourseModel;

  @Output() clicked: EventEmitter<CourseModel> = new EventEmitter<CourseModel>();

  @Output() deleted:EventEmitter<number> = new EventEmitter<number>();

  isOrg:boolean;
  constructor(private usersService:UsersService) { }
  ngOnInit(): void {
    this.isOrg=this.usersService.getLoggedUser()?.isOrg;
  }

  onClick(): void {
    this.clicked.emit(this.course);
  }
  onDelete():void{
    this.deleted.emit(this.course.id);
  }
}
