import { DailyRates } from './dailyRates.model';
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

  private itemId : number;
  private itemName: string;
  private itemType: ItemType;
  private dailyRates: DailyRates[];
  constructor(itemId: number, itemName: string,itemType: ItemType, dailyRates: DailyRates[]){
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemId = itemId;
    this.dailyRates = dailyRates;
  }
}
