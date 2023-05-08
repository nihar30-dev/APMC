import { Item } from './item.model';

export class DailyRates {
  constructor(
            private rateId: number,
            private item: Item,
            private minPrice: number, 
            private maxPrice: number,
            private avgPrice : number,
            private quantity : number,
            private income: number,
            private day: string) {
            this.rateId = rateId;
        this.item = item;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.avgPrice = avgPrice;
        this.quantity = quantity;
        this.income = income;
        this.day = day;
    }
}
