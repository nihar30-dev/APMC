import { Item } from './item.model';

export class DailyRates {
  constructor(
            private item: Item,
            private minPrice: number, 
            private maxPrice: number,
            private average : number,
            private quantity : number,
            private income: number,
            private day: Date) {
    this.item = item;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.average = average;
    this.quantity = quantity;
    this.income = income;
    this.day = day;
  }
}
