import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
let HomeComponent = class HomeComponent {
    constructor(dailyRates, datepipe, dateformatter, storageService, toster) {
        this.dailyRates = dailyRates;
        this.datepipe = datepipe;
        this.dateformatter = dateformatter;
        this.storageService = storageService;
        this.toster = toster;
        this.DRCommodities = [];
        this.DRFruits = [];
        this.DRVegetables = [];
        this.role = '';
        this.rates = [];
    }
    ngOnInit() {
        this.storageService.role$.subscribe(data => {
            this.role = data;
        });
        this.role = this.storageService.getRole();
        const myCarousel = document.querySelector('#myCarousel');
        if (myCarousel) {
            const carousel = new bootstrap.Carousel(myCarousel, {
                interval: 2000,
                wrap: true
            });
        }
        this.getPrices()
            .then(() => { this.drFilter(); })
            .catch((error) => { this.toster.error('SOmethng went wrong'); });
    }
    getPrices() {
        const prmoise = new Promise((res, rej) => {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            const day = this.dateformatter.dateinyyyymmdd(date);
            console.log('todat date : ', day);
            this.dailyRates.getDailyRatesByDate(day).subscribe((data) => {
                this.AlldailyRate = data;
                if (this.AlldailyRate == null) {
                    this.toster.info('No rates for previous day');
                    return;
                }
                res(this.AlldailyRate);
            }, error => {
                rej(error);
            });
        });
        return prmoise;
    }
    drFilter() {
        this.AlldailyRate.forEach((dr) => {
            if (dr['item']['itemType']['itemTypeId'] == 1) {
                this.DRCommodities.push(dr);
            }
            else if (dr['item']['itemType']['itemTypeId'] == 2) {
                this.DRVegetables.push(dr);
            }
            else if (dr['item']['itemType']['itemTypeId'] == 3) {
                this.DRFruits.push(dr);
            }
        });
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map