import { Injectable } from "@angular/core";
import { Shop } from "../models/shop.model";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private http: HttpClient){
    }

    private shops : any;
    // private shop : any;

    createShop(shop: any) {
        // this.shops.push(shop);
        return this.http.post('http://localhost:8099/shop', shop);
    }

    getAllShopNo(){
        return this.http.get('http://localhost:8099/shop');
    }

    getAllShops() {
        return this.http.get('http://localhost:8099/agent');
    }
    
    // checkShopExists(shopNumber : string){        
    //     return of(this.shops.some(shop => shop.getShopNo() === shopNumber));
    // }
}