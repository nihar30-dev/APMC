import {Item} from "./item.model";

export interface Slot{

    slotId:number;
    item:Item;
    totalQuantity:number;
    bookedQuantity:number;
    slotDate:string;


}
