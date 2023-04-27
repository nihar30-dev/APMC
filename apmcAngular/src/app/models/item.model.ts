import { ItemType } from './itemType.model';

// export class Item{
//
//   private itemId : number;
//   public itemName: string;
//   private itemType: ItemType;
//   constructor(itemId: number, itemName: string,itemType: ItemType){
//     this.itemName = itemName;
//     this.itemType = itemType;
//     this.itemId = itemId;
//   }
//
//   public get getitemName(){
//     return this.itemName;
//   }
// }

export interface Item{
 itemId : number;
 itemName: string;
 itemType: ItemType;
}
