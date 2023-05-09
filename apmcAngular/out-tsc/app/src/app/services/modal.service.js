import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ModalService = class ModalService {
    constructor() {
        this.display = new Subject();
        this.showModal = false;
        this.formName = '';
    }
    watch() {
        return this.display.asObservable();
    }
    open(formName) {
        this.formName = formName;
        this.showModal = true;
        this.display.next('open');
    }
    close() {
        this.showModal = false;
        this.display.next('close');
    }
};
ModalService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ModalService);
export { ModalService };
//# sourceMappingURL=modal.service.js.map