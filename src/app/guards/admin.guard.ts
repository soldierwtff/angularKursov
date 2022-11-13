import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsersService } from "../services/users.service";

@Injectable({
    providedIn:'root'
})

export class AdminGuard implements CanActivate{

    constructor(private router:Router,private usersService:UsersService){

    }
    canActivate():boolean{
        const loggedUser = this.usersService.getLoggedUser();
        if(loggedUser.isOrg){
            return true;
        }
        this.router.navigate(['/list']);
        return false;
    }
}