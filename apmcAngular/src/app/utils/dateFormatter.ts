import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatter{

  constructor(public datepipe: DatePipe){
  }

  dateinyyyymmdd(date:Date){
    return '' + this.datepipe.transform(date, 'yyyy-MM-dd');
  }


}
