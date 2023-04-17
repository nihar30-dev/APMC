export class Item {
    constructor(
            private itemId: number, 
            private itemName: string, 
            private itemType: number, 
            private minPrice: number, 
            private maxPrice: number,
            private average : number,
            private quantity : number,
            private income: number,
            private day: Date) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemType = itemType;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.average = average;
        this.quantity = quantity;
        this.income = income;
        this.day = day;
    }

    getItemId() {
        return this.itemId;
    }

    setItemId(id: number){
        this.itemId = id;
    }

    getItemName() {
        return this.itemName;
    }

    setItemName(itemName: string){
        this.itemName = itemName;
    }
    
    getItemType() {
        return this.itemType;
    }
    
    setItemType(itemType: number){
        this.itemType = itemType;
    }

    getMinPrice(){
        return this.minPrice;
    }

    setMinPrice(minPrice: number){
        this.minPrice = minPrice;
    }

    getMaxPrice() {
        return this.maxPrice;
    }

    setMaxPrice(maxPrice: number){
        this.maxPrice = maxPrice;
    }

    getAverage(){
        return this.average;
    }

    setAverage(average : number){
        this.average = average;
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(quantity : number){
        this.quantity = quantity;
    }

    getIncome(){
        return this.income;
    }

    setIncome(income: number){
        this.income = income;
    }

    getDay() {
        return this.day;
    }

    setDay(day: Date){
        this.day = day;
    }
}