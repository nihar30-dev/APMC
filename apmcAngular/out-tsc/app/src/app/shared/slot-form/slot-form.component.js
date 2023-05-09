import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let SlotFormComponent = class SlotFormComponent {
    constructor(fb, itemService, calendar) {
        this.fb = fb;
        this.itemService = itemService;
        this.calendar = calendar;
        this.minDate = this.calendar.getToday();
        this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 2);
    }
    ngOnInit() {
        this.myForm = this.fb.group({
            quantity: ['', Validators.required],
            itemType: ['', Validators.required],
            item: ['', Validators.required],
            date: ['', Validators.required]
        });
    }
    onSubmit(myForm) {
        if (myForm.valid) {
            console.log(myForm.value);
        }
    }
    onClick(id) {
        this.itemService.getAllItemsByTypeId(id);
    }
    onDateSelect(dp) {
        setTimeout(() => {
            dp.close();
        }, 100);
    }
};
SlotFormComponent = __decorate([
    Component({
        selector: 'app-slot-form',
        templateUrl: './slot-form.component.html',
        styleUrls: ['./slot-form.component.scss']
    })
], SlotFormComponent);
export { SlotFormComponent };
//# sourceMappingURL=slot-form.component.js.map