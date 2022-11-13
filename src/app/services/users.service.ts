import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {map} from "rxjs/operators";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn:'root'
})

export class UsersService{
    
    url = 'http://localhost:3000/users';

    loggedUser$ = new BehaviorSubject<UserModel>(null);

    constructor(private http:HttpClient){

    }
    getLoggedUser():UserModel{
        return JSON.parse(localStorage.getItem('loggedUser'));
    }
    logout():void{
        localStorage.removeItem('loggedUser');
        location.reload();
    }
    login$(username:string , password:string):Observable<UserModel>{
        return this.http.get(this.url).pipe(
            map((response:UserModel[])=>{
                const user = response.find(u=>u.username ===username && u.password===password);

                if(user){
                    return user;
                }
                return null;
            })
        );
    }
    getById$(userID:number):Observable<UserModel>{
        return this.http.get<UserModel>(`${this.url}/${userID}`)
    }

    put$(body:UserModel):Observable<UserModel>{
        return this.http.put<UserModel>(`${this.url}/${body.userID}`,body);
    }
    post$(body:UserModel):Observable<UserModel>{ //ili any ili void
        return this.http.post<UserModel>(this.url, body); // ili any ili void
    }

    delete$(userID:number):Observable<any>{
        return this.http.delete<any>(`${this.url}/${userID}`);
    }
}