import { ItemType } from "./itemType.model";

export class Item{

    private itemId : number;
    private itemName: string;
    private itemType: ItemType;
    constructor(itemId: number, itemName: string,itemType: ItemType){
        this.itemName = itemName;
        this.itemType = itemType;
        this.itemId = itemId;
    }
}