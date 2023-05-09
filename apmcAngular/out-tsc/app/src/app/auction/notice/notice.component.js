import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let NoticeComponent = class NoticeComponent {
    constructor(fb, noticeService, modalService, storageService, toster) {
        this.fb = fb;
        this.noticeService = noticeService;
        this.modalService = modalService;
        this.storageService = storageService;
        this.toster = toster;
        this.role = '';
        this.day = '';
        this.date = null;
        this.date1 = null;
        this.selectedDate = '';
        this.activeIds = [];
        this.length = 0;
        this.panels = [];
    }
    ngOnInit() {
        this.noticeForm = this.fb.group({
            heading: ['', Validators.required],
            details: ['', Validators.required],
            startDate: [''],
            endDate: ['']
        });
        //for getting role
        this.role = this.storageService.getRole();
        this.noticeService.getNotice().subscribe((data) => {
            this.notifications = data;
            this.length = data.length;
            this.panels = Array.from({ length: this.length }, (_, i) => i);
        });
    }
    onSubmit(noticeForm) {
        const notice = {
            noticeId: 0,
            noticeHeading: noticeForm.value.heading,
            noticeContent: noticeForm.value.details,
            createdAt: new Date,
            startDate: new Date(noticeForm.value.startDate.year, noticeForm.value.startDate.month - 1, noticeForm.value.startDate.day + 1),
            endDate: new Date(noticeForm.value.endDate.year, noticeForm.value.endDate.month - 1, noticeForm.value.endDate.day + 1),
            slot: undefined
        };
        this.noticeService.addNotice(notice).subscribe(data => {
            this.toster.success('Notice added');
            console.log(data);
        }, error => {
            this.toster.error(error.error['message']);
        });
    }
    openAll() {
        this.activeIds = this.panels.map(p => 'panel-' + p);
        console.log(this.activeIds);
    }
};
NoticeComponent = __decorate([
    Component({
        selector: 'app-notice',
        templateUrl: './notice.component.html',
        styleUrls: ['./notice.component.scss']
    })
], NoticeComponent);
export { NoticeComponent };
//# sourceMappingURL=notice.component.js.map