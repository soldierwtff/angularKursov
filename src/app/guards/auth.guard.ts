import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router:Router,private userService:UsersService){

    }

    canActivate(): boolean {
        const loggedUser = this.userService.getLoggedUser();
        if(loggedUser){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}