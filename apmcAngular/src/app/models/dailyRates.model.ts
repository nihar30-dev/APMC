import { Item } from './item.model';

export interface DailyRates {
         rateId: number,
           item: Item,
            minPrice: number,
             maxPrice: number,
            avgPrice : number,
            quantity : number,
             income: number,
           day: string
}


