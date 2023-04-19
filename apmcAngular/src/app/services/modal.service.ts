import { Injectable} from "@angular/core";
import { FormControlName } from "@angular/forms";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ModalService{
    
    private display: Subject<'open' |'close'> = new Subject();
    showModal : boolean = false;
    formName: string = '';

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