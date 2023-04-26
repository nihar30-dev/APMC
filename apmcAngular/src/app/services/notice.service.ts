import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService{
  constructor(private http: HttpClient){}
  
  addNotice(heading : string, details : string){
    return this.http.post(environment.ApiURL+'notice',heading + details);
    
  }
}