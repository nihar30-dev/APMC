import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../models/slot.model';


@Injectable({providedIn:'root'})
export class SlotService{

  constructor(private http: HttpClient){

  }

  addSlot(itemRate: Slot){
    return this.http.post<Slot>('http://localhost:8099/slots', itemRate);
  }

  getAllSlots(){
    return this.http.get<Slot[]>('http://localhost:8099/slots');
  }

  getSlotByItemType(itemTypeId: number){
    return this.http.get<Slot[]>('http://localhost:8099/slots/'+itemTypeId);
  }

  deleteSlot(i:number){
    return this.http.delete('http://localhost:8099/slots/'+i);
  }
}
