import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Slot } from "../models/slot.model";
import { SlotDetails } from "../models/slot-details.model";
import { environment } from "environment";
import { Observable } from "rxjs";
import {response} from "../models/dto/response.model";


@Injectable({providedIn:'root'})
export class SlotDetailsService{

  constructor(private http: HttpClient){
  }

  bookSlot(slotdetails : SlotDetails){
    return this.http.post<response>('http://localhost:8099/slotDetail', slotdetails);
  }

  getSlotDetailByAgentId(agentId:number):Observable<any>{
    return this.http.get<SlotDetails>(environment.ApiURL+'slotDetail/agent/'+agentId);
  }

  getSlotDetailByUserId(userId:number):Observable<any>{
    return this.http.get<SlotDetails>(environment.ApiURL+'slotDetail/user/'+userId);
  }
}
