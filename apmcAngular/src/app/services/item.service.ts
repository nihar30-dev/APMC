import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { of } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    items : Item[] = [
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-16")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-17")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-18")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-19")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-20")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15")),
        new Item(1, 'Wheat', 1 , 428, 494, 450, 50, 1000, new Date("2023-06-15"))
    ];

    createItem(item: any) {
        this.items.push(item);
    }

    getAllItems(day : NgbDateStruct) {
        console.log(day);
        return of(this.items.slice());
        // return this.http.get('http://example.com/api/shops').subscribe((data: any) => {
        //   this.shops = data;
        // });
    }
}