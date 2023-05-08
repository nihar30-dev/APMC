import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { DailyRates } from '../models/dailyRates.model';


@Injectable({providedIn:'root'})
export class DailyRatesService{

  constructor(private http: HttpClient){

  }

  getDailyRatesByDate(date:string){
    return this.http.get<DailyRates[]>('http://localhost:8099/dailyRates?day='+date); 
  }

  getDailyRatesByDateAndItemType(date:string,typeId:number){
    return this.http.get<DailyRates[]>('http://localhost:8099/dailyRates/itemType/'+typeId+'?day='+date); 
  }

  addDailyItemRate(itemRate: DailyRates, date:string){
    return this.http.post<DailyRates[]>('http://localhost:8099/dailyRates?day='+date, itemRate);
  }

  getAlldailyRates(){
    return this.http.get<DailyRates[]>('http://localhost:8099/dailyRates/all');
  }
}
