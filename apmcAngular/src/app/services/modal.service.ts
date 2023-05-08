import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class ModalService{
    
  private display: Subject<'open' |'close'> = new Subject();
  showModal  = false;
  formName = '';

  watch(): Observable<'open' | 'close'>{
    return this.display.asObservable();
  }

  open(formName: string){
    this.formName = formName;
    this.showModal = true;
    this.display.next('open');
  }

  close(){
    this.showModal = false;
    this.display.next('close');
  }

}
