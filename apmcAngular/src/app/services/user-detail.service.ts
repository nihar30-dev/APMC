import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { UserDetail } from "../models/user-detail.model";

@Injectable({providedIn:'root'})
export class UserDetailService{

  constructor(private http: HttpClient){

  }

  addUserDetail(userDetail: UserDetail){
    return this.http.post<UserDetail>(environment.ApiURL+'userDetail', userDetail);
  }
}