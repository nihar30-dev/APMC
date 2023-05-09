import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from 'src/app/base/dailyRates/CustomDateParserFormatter';
import { ItemType } from 'src/app/models/itemType.model';
let SlotComponent = class SlotComponent {
    constructor(ngbCalendar, dateAdapter, dateFormatter, fb, slotModal, itemService, slotService, calendar, toaster) {
        this.ngbCalendar = ngbCalendar;
        this.dateAdapter = dateAdapter;
        this.dateFormatter = dateFormatter;
        this.fb = fb;
        this.slotModal = slotModal;
        this.itemService = itemService;
        this.slotService = slotService;
        this.calendar = calendar;
        this.toaster = toaster;
        this.day = '';
        this.date1 = null;
        this.allSlots = [];
        this.active = 0;
        this.date = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        this.selectedDate = '';
        this.indexedDB = indexedDB;
        this.minDate = this.calendar.getToday();
        this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 2);
    }
    ngOnInit() {
        this.active = 0;
        const date = new Date();
        this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
        this.day = this.dateFormatter.dateinyyyymmdd(date);
        this.myForm = this.fb.group({
            quantity: ['', Validators.required],
            itemType: ['', Validators.required],
            item: ['', Validators.required],
            date: ['', Validators.required]
        });
        this.loadItemTypes();
    }
    loadItemTypes() {
        this.itemService.getItemTypes().subscribe((data) => {
            this.itemTypes = data;
        }, (error) => {
            this.toaster.error("Error loading Item Types");
        });
    }
    loadItem() {
        let n = +document.getElementById('itemTypeId').value;
        this.itemsList = [];
        this.itemService.getAllItemsByTypeId(n).subscribe((data) => {
            this.itemsList = data;
        }, error => {
            this.toaster.error("Error loading Item");
        });
    }
    open(content) {
        return this.slotModal.open(content, { centered: true });
    }
    onSubmitSlot(myForm) {
        let date = myForm.value['date'];
        let month = date.month + '';
        let day = date.day + '';
        let year = date.year + '';
        let formattedDay = year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0');
        myForm.value['date'] = formattedDay;
        if (myForm.valid) {
            this.addSlot(myForm);
            this.slotModal.dismissAll();
        }
    }
    addSlot(myForm) {
        const items = { itemId: myForm.value['item'], itemName: "", itemType: new ItemType(0, ''), dailyRates: [] };
        const slot = {
            slotId: 0,
            item: items,
            totalQuantity: myForm.value['quantity'],
            bookedQuantity: 0,
            slotDate: myForm.value['date']
        };
        this.slotService.addSlot(slot).subscribe((data) => {
            this.toaster.success("Slot added successfully!");
        }, (error) => {
            this.toaster.error(error.error['message']);
        });
    }
    onClick(id) {
        this.itemService.getAllItemsByTypeId(id);
    }
    onDateSelect(dp) {
        this.date1 = new Date(`${this.date?.year}-${(this.date?.month + '').padStart(2, '0')}-${(this.date?.day + '').padStart(2, '0')}`);
        this.day = dp._inputValue.slice(6) + '-' + dp._inputValue.slice(3, 5) + '-' + dp._inputValue.slice(0, 2);
        this.showContainer(0);
    }
    showContainer(a) {
        console.log(a);
        this.allSlots = [];
        this.slotService.getSlotByItemType(1).subscribe((data) => {
            this.allSlots = data;
            console.log(this.allSlots);
            if (this.allSlots.length == 0)
                this.toaster.info('No data found');
        }, () => {
            this.toaster.error('No data found');
        });
        this.activateSearch = true;
    }
    getAllSlots() {
        this.slotService.getAllSlots().subscribe((data) => {
            this.allSlots = data;
            this.toaster.success("Slot fetched successfully!");
        }, (error) => {
            this.toaster.error(error.error['message']);
        });
    }
};
SlotComponent = __decorate([
    Component({
        selector: 'app-admin-slot',
        templateUrl: './slot.component.html',
        styleUrls: ['./slot.component.scss'],
        providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
    })
], SlotComponent);
export { SlotComponent };
//# sourceMappingURL=slot.component.js.map