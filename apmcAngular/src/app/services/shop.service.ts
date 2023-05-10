import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agent } from '../models/agent.model';
import { Shop } from '../models/shop.model';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient){
    
  }




  createShop(shop: Shop) {
    return this.http.post(environment.ApiURL+'shop',shop);
  }

  getAllShopNo(){
    return this.http.get<Shop[]>(environment.ApiURL+'shop');
  }

  getAllShops() {
    return this.http.get<Agent[]>(environment.ApiURL+'agent');
  }

  deleteAgent(i:number){
    console.log(i);
    return this.http.delete(environment.ApiURL+'agent/'+i);
  }
    
  // checkShopExists(shopNumber : string){        
  //     return of(this.shops.some(shop => shop.getShopNo() === shopNumber));
  // }
}
