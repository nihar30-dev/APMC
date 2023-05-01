import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import {Notice} from "../models/notice.model";

@Injectable({
  providedIn: 'root'
})
export class NoticeService{
  constructor(private http: HttpClient){}
  private httpOptions = {
    headers: new HttpHeaders({'contentType': 'application/json' })
  };
  addNotice(notice:Notice){
    // console.log(heading," ", details);
    const noticeId = notice.noticeId;
    const noticeHeading = notice.noticeHeading;
    const noticeContent = notice.noticeContent;
    let slot = notice.slot===undefined?null:notice.slot;


    console.log(notice);
    return this.http.post(environment.ApiURL+'notice',{noticeId,noticeHeading,noticeContent,slot},this.httpOptions);
    
  }
}
