import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { ItemType } from '../models/itemType.model';
import {environment} from '../../../environment';
import { DailyRates } from '../models/dailyRates.model';

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


  getAllItemsByDate(day : string) {
    return this.http.get<DailyRates[]>('http://localhost:8099/dailyRates?day='+day);
  }

  getAllItemsByTypeId(typeId: number){
    return this.http.get<Item[]>(environment.ApiURL+'item/itemType/'+typeId);
  }
}
