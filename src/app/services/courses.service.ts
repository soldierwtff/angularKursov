import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { CourseModel } from "../models/course.model";

@Injectable({providedIn:'root'})
export class CoursesService{
    constructor(private http:HttpClient){

    }
    url = 'http://localhost:3000/courses';
    getAll$():Observable<CourseModel[]>{
        return this.http.get<CourseModel[]>(this.url);
    }

    getById$(id:number):Observable<CourseModel>{
        return this.http.get<CourseModel>(`${this.url}/${id}`)
    }

    post$(body:CourseModel):Observable<CourseModel>{ 
        return this.http.post<CourseModel>(this.url, body); 
    }
    put$(body:CourseModel):Observable<CourseModel>{
        return this.http.put<CourseModel>(`${this.url}/${body.id}`,body);
    }
    delete$(id:number):Observable<undefined>{
        return this.http.delete<undefined>(`${this.url}/${id}`);
    }
}