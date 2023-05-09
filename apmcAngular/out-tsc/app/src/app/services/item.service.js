import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
let ItemService = class ItemService {
    // itemsList : string[] = ['wheat', 'rice', 'potato', 'okra', 'mango', 'watermelon']
    constructor(http) {
        this.http = http;
    }
    createItem(item) {
        // this.shops.push(shop);
        return this.http.post(environment.ApiURL + 'item', item);
    }
    getItemTypes() {
        return this.http.get(environment.ApiURL + 'itemType');
    }
    getAllItemsByDate(day) {
        return this.http.get('http://localhost:8099/dailyRates?day=' + day);
    }
    getAllItemsByTypeId(typeId) {
        return this.http.get(environment.ApiURL + 'item/itemType/' + typeId);
    }
};
ItemService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ItemService);
export { ItemService };
//# sourceMappingURL=item.service.js.map