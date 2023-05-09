import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import Chart from "chart.js/auto";
let DashboardComponent = class DashboardComponent {
    constructor(storageService, dailyRatesSerivce) {
        this.storageService = storageService;
        this.dailyRatesSerivce = dailyRatesSerivce;
        this.showChart = false;
        this.role = '';
        this.rates = [];
    }
    ngOnInit() {
        this.createChart();
        this.storageService.role$.subscribe(data => {
            this.role = data;
        });
        this.role = this.storageService.getRole();
    }
    createChart() {
        this.showChart = true;
        this.dailyRatesSerivce.getAlldailyRates().subscribe((data) => {
            this.rates = data;
        });
        const rates1 = [];
        this.rates.forEach((dr) => {
            if (dr['item']['itemName'] === 'CastorSeed') {
                rates1.push(dr);
            }
        });
        const day = [], minPrice = [], maxPrice = [];
        rates1.forEach((r) => {
            day.push(r.day);
            maxPrice.push(r.maxPrice);
            minPrice.push(r.minPrice);
        });
        new Chart(this.lineChart?.nativeElement, {
            type: 'line',
            data: {
                labels: day,
                datasets: [
                    {
                        label: 'Max Price',
                        data: maxPrice,
                        backgroundColor: 'green'
                    },
                    {
                        label: 'Min Price',
                        data: minPrice,
                        backgroundColor: 'red'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5,
                plugins: {
                    title: {
                        display: true,
                        text: 'apple',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            },
        });
    }
};
__decorate([
    ViewChild('myChart')
], DashboardComponent.prototype, "lineChart", void 0);
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map