import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DailyRatesService = class DailyRatesService {
    constructor(http) {
        this.http = http;
    }
    getDailyRatesByDate(date) {
        return this.http.get('http://localhost:8099/dailyRates?day=' + date);
    }
    getDailyRatesByDateAndItemType(date, typeId) {
        return this.http.get('http://localhost:8099/dailyRates/itemType/' + typeId + '?day=' + date);
    }
    addDailyItemRate(itemRate, date) {
        return this.http.post('http://localhost:8099/dailyRates?day=' + date, itemRate);
    }
    getAlldailyRates() {
        return this.http.get('http://localhost:8099/dailyRates/all');
    }
};
DailyRatesService = __decorate([
    Injectable({ providedIn: 'root' })
], DailyRatesService);
export { DailyRatesService };
//# sourceMappingURL=daily-rates.service.js.map