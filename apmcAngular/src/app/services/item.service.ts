import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { of } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    commItems : Item[] = [
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-16")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-17")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-18")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-19"))]

    vegItems : Item[] = [        
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-20")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Potato', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15"))
    ]

    fruitItems : Item[] = [        
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-20")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Mango', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15"))
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

    getAllItems(day : any, typeId: number) {
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
}