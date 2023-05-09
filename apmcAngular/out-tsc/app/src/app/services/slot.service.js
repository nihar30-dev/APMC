import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let SlotService = class SlotService {
    constructor(http) {
        this.http = http;
    }
    addSlot(itemRate) {
        return this.http.post('http://localhost:8099/slots', itemRate);
    }
    getAllSlots() {
        return this.http.get('http://localhost:8099/slots');
    }
    getSlotByItemType(itemTypeId) {
        return this.http.get('http://localhost:8099/slots/' + itemTypeId);
    }
};
SlotService = __decorate([
    Injectable({ providedIn: 'root' })
], SlotService);
export { SlotService };
//# sourceMappingURL=slot.service.js.map