import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DateFormatter = class DateFormatter {
    constructor(datepipe) {
        this.datepipe = datepipe;
    }
    dateinyyyymmdd(date) {
        let day = "" + this.datepipe.transform(date, 'yyyy-MM-dd');
        return day;
    }
};
DateFormatter = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DateFormatter);
export { DateFormatter };
//# sourceMappingURL=dateFormatter.js.map