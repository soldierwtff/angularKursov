import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TypeModel } from "../models/type.model";

@Injectable({
    providedIn:'root'
})
export class TypesService {
url = 'http://localhost:3000/types';

constructor(private http:HttpClient){


}//end constructor
getAll$():Observable<TypeModel[]>{
    return this.http.get<TypeModel[]>(this.url);
}

}//end class