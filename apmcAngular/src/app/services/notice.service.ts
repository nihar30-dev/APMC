import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import {Notice} from '../models/notice.model';


@Injectable({
  providedIn: 'root'
})
export class NoticeService{
  constructor(private http: HttpClient){}

  private httpOptions = {
    headers: new HttpHeaders({'contentType': 'application/json' })
  };

  addNotice(notice:Notice){
    return this.http.post(environment.ApiURL+'notice',notice);
  }

  getNotice(pageNumber: number, pageSize: number) {
    return this.http.get(environment.ApiURL + `notice/notExpired?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
