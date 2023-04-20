import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    itemsList : string[] = ['wheat', 'rice', 'potato', 'okra', 'mango', 'watermelon']
    commItems : Item[] = [
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-16")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-17")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-18")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-19")),
        new Item(4, 'Rice', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-19"))
    ]

    vegItems : Item[] = [        
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-20")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(2, 'Okra', 1, 428, 494, 450, 50, 1000, new Date("2023-06-16"))
    ]

    fruitItems : Item[] = [        
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-20")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(3, 'Watermelon', 1, 428, 494, 450, 50, 1000, new Date("2023-06-16"))
    ]

    createItem(item: any, id : number) {
        switch(id){
            case 2 : {
                this.vegItems.push(item);
                break;
            }
            case 3 : {
                this.fruitItems.push(item);
                break;
            }
            default: {
                this.commItems.push(item);
                break;
            }
        }
    }

    getAllItemsByDate(day : any, typeId: number) {
        console.log(day);
        switch(typeId){
            case 2 : {
                return of(this.vegItems.slice());
            }
            case 3 : {
                return of(this.fruitItems.slice());
            }
            default: {
                return of(this.commItems.slice());
            }
        }
        
        // return this.http.get('http://example.com/api/shops').subscribe((data: any) => {
        //   this.shops = data;
        // });
    }

    getAllItems(typeId: number){
        //api call will call based on type id and store in respective commitems , vegitems, fruititems
        //for dummy data itemlist is used

        return of(this.itemsList.slice());
    }
}