import { Injectable } from "@angular/core";
import { Shop } from "../models/shop.model";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    private shops: Shop[] = [
        new Shop(1, 'A-13', 34, "Sardar Traders", "Ramnath", "9876543214"),
        new Shop(2, 'B-13', 44, "Ankur Traders", "Ramnath", "7846591320"),
        new Shop(3, 'C-13', 54, "Rishi Traders", "Ramnath", "7986534210"),
        new Shop(3, 'C-26', 55, "Dhruv Traders", "Ramnath", "9867541320"),
        new Shop(3, 'C-14', 56, "Vyada Traders", "Ramnath", "8573821936"),
        new Shop(4, 'D-13', 64, "Ridham Traders", "Ramnath", "8675904321"),
        new Shop(5, 'E-13', 74, "Ritika Traders", "Ramnath", "8576304129"),
        new Shop(6, 'F-13', 84, "Hari Traders", "Ramnath", "914270563"),
        new Shop(7, 'G-13', 94, "Vallabh Traders", "Ramnath", "7586401239")
    ]

    createShop(shop: any) {
        this.shops.push(shop);
    }

    getAllShops() {
        return of(this.shops.slice());
        // return this.http.get('http://example.com/api/shops').subscribe((data: any) => {
        //   this.shops = data;
        // });
    }
    
    checkShopExists(shopNumber : string){        
        return of(this.shops.some(shop => shop.getShopNo() === shopNumber));
    }
}