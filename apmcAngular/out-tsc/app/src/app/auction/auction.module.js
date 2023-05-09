import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes = [
    { path: 'notice', component: NoticeComponent },
    { path: 'slot', component: SlotComponent }
];
let AuctionModule = class AuctionModule {
};
AuctionModule = __decorate([
    NgModule({
        declarations: [
            NoticeComponent,
            SlotComponent,
        ],
        imports: [
            RouterModule.forRoot(routes),
            CommonModule,
            ReactiveFormsModule,
            SharedModule,
            NgbDatepickerModule,
            FormsModule,
            NgbAccordionModule,
            NgbModule,
            NgbDatepickerModule
        ]
    })
], AuctionModule);
export { AuctionModule };
//# sourceMappingURL=auction.module.js.map