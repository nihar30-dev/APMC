import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyRates } from '../models/dailyRates.model';
import {environment} from "../../../environment";

@Injectable({providedIn:'root'})
export class DailyRatesService{

  constructor(private http: HttpClient){

  }

  getDailyRatesByDate(date:string){
    return this.http.get<DailyRates[]>(environment.ApiURL+'dailyRates?day='+date);
  }

  getDailyRatesByDateAndItemType(date:string,typeId:number){
    return this.http.get<DailyRates[]>(environment.ApiURL+'dailyRates/itemType/'+typeId+'?day='+date);
  }

  addDailyItemRate(itemRate: DailyRates, date:string){
    return this.http.post<DailyRates[]>(environment.ApiURL+'dailyRates?day='+date, itemRate);
  }

  getAlldailyRates(){
    return this.http.get<DailyRates[]>(environment.ApiURL+'dailyRates/all');
  }
}
