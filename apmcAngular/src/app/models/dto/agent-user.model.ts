import { Agent } from '../agent.model';
import { Slot } from '../slot.model';
import { UserDetail } from '../user-detail.model';

export interface UserAgent{
    
    user: User2
    agent:Agent;
    slot:Slot;
    quantity:number;
}

export interface User2{
   id:number,
   userDetail:UserDetail,
   userName:string,
   contact:string   
}