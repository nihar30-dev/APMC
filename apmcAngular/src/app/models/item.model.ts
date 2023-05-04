import { DailyRates } from './dailyRates.model';
import { ItemType } from './itemType.model';


export interface Item{
  itemId : number;
  itemName: string;
  itemType: ItemType;
  dailyRates: DailyRates[];
 }
