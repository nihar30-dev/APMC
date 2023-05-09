import {Injectable} from '@angular/core';
import {Agent} from '../../../../models/agent.model';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class PdfgeneratorService{

  private data = new Subject<Agent[]>();
  constructor() {

  }

  generatePDF(data:Agent[]){
    this.data.next(data);

    console.log(data);
  }



  getData():Observable<Agent[]>{
    return this.data.asObservable();
  }

}
