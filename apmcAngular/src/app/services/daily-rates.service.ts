import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyRates } from '../models/dailyRates.model';



@Injectable({providedIn:'root'})
export class DailyRatesService{



  constructor(private http: HttpClient){

  }

  getDailyRatesBy(date:string){

    return this.http.get<DailyRates[]>('http://localhost:8099/dailyRates?day='+date);
  }
}
