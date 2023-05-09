import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ItemType } from 'src/app/models/itemType.model';
let ItemFormComponent = class ItemFormComponent {
    constructor(fb, itemService, modalService, tosterService) {
        this.fb = fb;
        this.itemService = itemService;
        this.modalService = modalService;
        this.tosterService = tosterService;
    }
    ngOnInit() {
        this.itemService.getItemTypes().subscribe((data) => {
            this.ItemTypes = data;
        }, () => {
            this.tosterService.error("Error loading ItemTypes");
        });
        this.itemForm = this.fb.group({
            itemTypeId: [null, Validators.required],
            itemName: [null, Validators.required]
        });
    }
    onSubmit(itemForm) {
        if (itemForm.valid) {
            const item = { itemId: 0, itemName: itemForm.value['itemName'], itemType: new ItemType(itemForm.value['itemTypeId'], ''), dailyRates: [] };
            this.itemService.createItem(item).subscribe(() => {
                this.tosterService.success("Item added successfully");
            });
            itemForm.reset();
            this.modalService.close();
        }
    }
};
ItemFormComponent = __decorate([
    Component({
        selector: 'app-item-form',
        templateUrl: './item-form.component.html',
        styleUrls: ['./item-form.component.scss']
    })
], ItemFormComponent);
export { ItemFormComponent };
//# sourceMappingURL=item-form.component.js.map