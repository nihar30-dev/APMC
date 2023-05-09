import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
let SidebarComponent = class SidebarComponent {
    constructor(router, storageService) {
        this.router = router;
        this.storageService = storageService;
        this.role = 'default';
        this.activePage = '';
    }
    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.activePage = window.location.href.split('/').slice(-1)[0];
            }
            this.storageService.role$.subscribe(data => {
                this.role = data;
            });
            this.role = this.storageService.getRole();
        });
    }
    onClickHome() {
        this.activePage = 'home';
        if (this.role !== 'ADMIN') {
            this.router.navigate(['home']);
        }
        else {
            this.router.navigate(['dashboard']);
        }
    }
    onClickAbout() {
        this.activePage = 'aboutUs';
        this.router.navigate(['aboutUs']);
    }
    onClickDailyRates() {
        this.activePage = 'dailyRates';
        this.router.navigate(['userRates']);
    }
    onClickAdminRates() {
        this.activePage = 'dailyRates';
        this.router.navigate(['adminRates']);
    }
    onClickSlot() {
        this.activePage = 'slot';
        this.router.navigate(['slot']);
    }
    onClickShops() {
        this.activePage = 'shops';
        this.router.navigate(['shops']);
    }
    onClickNotice() {
        this.activePage = 'notice';
        this.router.navigate(['notice']);
    }
    onClickContact() {
        this.activePage = 'contact';
        this.router.navigate(['contact']);
    }
    onClickGallery() {
        this.activePage = 'gallery';
        this.router.navigate(['gallery']);
    }
};
SidebarComponent = __decorate([
    Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss']
    })
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map