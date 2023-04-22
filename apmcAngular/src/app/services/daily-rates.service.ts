import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';


@Injectable({providedIn:'root'})
export class DailyRatesService{

    DailyRates : any;

    constructor(private http: HttpClient){

    }

    getDailyRatesBy(){
        var todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);
        const headers = new HttpHeaders({
        //   day: todayDate
        });
        return this.http.get("http://localhost:8099/dailyRates?day=2023-04-14");
    }
}