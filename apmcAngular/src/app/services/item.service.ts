import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { ItemType } from '../models/itemType.model';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // itemsList : string[] = ['wheat', 'rice', 'potato', 'okra', 'mango', 'watermelon']
  constructor(private http: HttpClient){
  }
    
  createItem(item: Item) {
    // this.shops.push(shop);
    return this.http.post<Item>(environment.ApiURL+'item', item);
  }

  getItemTypes(){
    return this.http.get<ItemType[]>(environment.ApiURL+'itemType');
  }


  // getAllItemsByDate(day : any, typeId: number) {
  //   //     switch(typeId){
  //   //         case 2 : {
  //   //             return of(this.vegItems.slice());
  //   //         }
  //   //         case 3 : {
  //   //             return of(this.fruitItems.slice());
  //   //         }
  //   //         default: {
  //   //             return of(this.commItems.slice());
  //   //         }
  //   //     }
  //
  //   // return this.http.get('http://example.com/api/shops').subscribe((data: any) => {
  //   //   this.shops = data;
  //   // });
  // }

  getAllItemsByTypeId(typeId: number){
    return this.http.get<Item[]>(environment.ApiURL+'item/itemType/'+typeId);
  }

  // submitItem(formData : any){
  //   //api calls
  //   //return true if succesful
  //   return of(true);
  // }
}
