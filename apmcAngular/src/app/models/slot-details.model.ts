import { Agent } from './agent.model';
import { Slot } from './slot.model';
import { User } from './user.model';

export interface SlotDetails{

    slotDetailId:number,
    user: User;
    slot:Slot;
    agent:Agent;
    quantity:number;
    
}
