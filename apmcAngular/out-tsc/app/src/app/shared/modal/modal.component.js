import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ModalComponent = class ModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    close() {
        return this.modalService.close();
    }
    ngOnInit() {
        this.display = this.modalService.watch();
    }
};
ModalComponent = __decorate([
    Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.scss']
    })
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map