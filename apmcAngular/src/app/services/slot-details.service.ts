import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Slot } from "../models/slot.model";
import { SlotDetails } from "../models/slot-details.model";


@Injectable({providedIn:'root'})
export class SlotDetailsService{

  constructor(private http: HttpClient){
  }

  bookSlot(slotdetails : SlotDetails){
    return this.http.post<SlotDetails>('http://localhost:8099/slotDetail', slotdetails);
  }
}