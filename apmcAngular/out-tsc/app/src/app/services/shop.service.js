import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
let ShopService = class ShopService {
    constructor(http) {
        this.http = http;
    }
    createShop(shop) {
        return this.http.post(environment.ApiURL + 'shop', shop);
    }
    getAllShopNo() {
        return this.http.get(environment.ApiURL + 'shop');
    }
    getAllShops() {
        return this.http.get(environment.ApiURL + 'agent');
    }
};
ShopService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ShopService);
export { ShopService };
//# sourceMappingURL=shop.service.js.map