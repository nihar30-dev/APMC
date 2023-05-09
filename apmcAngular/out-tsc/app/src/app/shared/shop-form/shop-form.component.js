import { __decorate } from "tslib";
import { Shop } from 'src/app/models/shop.model';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let ShopFormComponent = class ShopFormComponent {
    constructor(formBuilder, modalService, shopService, tosterService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.shopService = shopService;
        this.tosterService = tosterService;
    }
    ngOnInit() {
        this.f = this.formBuilder.group({
            shopNo: ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
        });
    }
    onSubmit(shopForm) {
        Shop;
        if (shopForm.valid) {
            this.shopService.createShop(shopForm.value).subscribe(data => {
                this.tosterService.success("Shop added successfully");
            }, (error) => {
                this.tosterService.error(error.error['message']);
            });
            this.modalService.close();
        }
    }
};
ShopFormComponent = __decorate([
    Component({
        selector: 'app-shop-form',
        templateUrl: './shop-form.component.html',
        styleUrls: ['./shop-form.component.scss']
    })
], ShopFormComponent);
export { ShopFormComponent };
//# sourceMappingURL=shop-form.component.js.map