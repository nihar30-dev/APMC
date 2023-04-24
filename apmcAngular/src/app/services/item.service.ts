import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    // itemsList : string[] = ['wheat', 'rice', 'potato', 'okra', 'mango', 'watermelon']
    constructor(private http: HttpClient){
    }
    
    createItem(item: any) {
        // this.shops.push(shop);
        console.log("in item create");
        return this.http.post('http://localhost:8099/item', item);
    }

    getItemTypes(){
        return this.http.get('http://localhost:8099/itemType')
    }


    getAllItemsByDate(day : any, typeId: number) {
    //     console.log(day);
    //     switch(typeId){
    //         case 2 : {
    //             return of(this.vegItems.slice());
    //         }
    //         case 3 : {
    //             return of(this.fruitItems.slice());
    //         }
    //         default: {
    //             return of(this.commItems.slice());
    //         }
    //     }
        
        // return this.http.get('http://example.com/api/shops').subscribe((data: any) => {
        //   this.shops = data;
        // });
    }

    // getAllItems(typeId: number){
    //     //api call will call based on type id and store in respective commitems , vegitems, fruititems
    //     //for dummy data itemlist is used

    //     return of(this.itemsList.slice());
    // }
    // submitItem(formData : any){
    //     //api calls
    //     //return true if succesful
    //     return of(true);
    // }
}