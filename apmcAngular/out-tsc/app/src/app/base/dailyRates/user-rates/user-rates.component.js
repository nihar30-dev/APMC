import { __decorate } from "tslib";
import { Component, Pipe } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '../CustomDateParserFormatter';
import { of } from 'rxjs';
let UserRatesComponent = class UserRatesComponent {
    constructor(itemService, dateformatter, calendar, dailyRateService, toastr, ngbCalendar, dateAdapter) {
        this.itemService = itemService;
        this.dateformatter = dateformatter;
        this.calendar = calendar;
        this.dailyRateService = dailyRateService;
        this.toastr = toastr;
        this.ngbCalendar = ngbCalendar;
        this.dateAdapter = dateAdapter;
        this.items = [];
        this.activateSearch = false;
        this.searchQuery = '';
        this.date = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        this.selectedDate = '';
        this.indexedDB = indexedDB;
        this.active = 0;
        this.dtOptions = {};
        this.of = of;
        this.maxDate = calendar.getToday();
    }
    ngOnInit() {
        //dataTable options
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
        };
        this.active = 0;
        const date = new Date();
        const day = this.dateformatter.dateinyyyymmdd(date);
        this.selectedDate = `${this.date?.year}-${(this.date?.month + '').padStart(2, '0')}-${(this.date?.day + '').padStart(2, '0')}`;
        this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
        this.loadItemTypes();
        this.dailyRateService.getDailyRatesByDate(day).subscribe((data) => {
            this.itemList = data;
            this.showContainer(0);
        }, () => {
            this.toastr.info('No rates for this date');
        });
    }
    //datepicker methods
    onDateSelect(dp) {
        this.selectedDate = `${this.date?.year}-${(this.date?.month + '').padStart(2, '0')}-${(this.date?.day + '').padStart(2, '0')}`;
        const day = dp._inputValue.slice(6) + '-' + dp._inputValue.slice(3, 5) + '-' + dp._inputValue.slice(0, 2);
        this.selectedDate = day;
        this.showContainer(0);
    }
    //load ItemTypes
    loadItemTypes() {
        return new Promise((res, rej) => {
            this.itemService.getItemTypes().subscribe((data) => {
                this.itemTypes = data;
                res(this.itemTypes);
            }, (error) => {
                rej(error);
            });
        });
    }
    // list methods
    showContainer(a) {
        console.log(a);
        this.itemList = [];
        this.dailyRateService.getDailyRatesByDateAndItemType(this.selectedDate, a + 1).subscribe((data) => {
            this.itemList = data;
            console.log(this.itemList);
            if (this.itemList.length == 0)
                this.toastr.info('No data found');
        }, () => {
            this.toastr.error('No data found');
        });
        this.activateSearch = true;
    }
};
UserRatesComponent = __decorate([
    Component({
        selector: 'app-user-rates',
        templateUrl: './user-rates.component.html',
        styleUrls: ['./user-rates.component.scss'],
        providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
    })
], UserRatesComponent);
export { UserRatesComponent };
let FilterPipe = class FilterPipe {
    transform(items, searchQuery) {
        if (!items || !searchQuery) {
            return items;
        }
        return items.filter(item => item['item']['itemName'].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    }
};
FilterPipe = __decorate([
    Pipe({
        name: 'filter'
    })
], FilterPipe);
export { FilterPipe };
//# sourceMappingURL=user-rates.component.js.map