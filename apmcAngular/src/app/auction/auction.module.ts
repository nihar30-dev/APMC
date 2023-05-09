import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { ViewSlotComponent } from './slot/view-slot/view-slot.component';
const routes: Routes = [
  {path : 'notice', component : NoticeComponent },
  {path : 'slot', component : SlotComponent},
  {path : 'viewSlot', component:ViewSlotComponent}
];
@NgModule({
  declarations: [
    NoticeComponent,
    SlotComponent,
    ViewSlotComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbDatepickerModule,
    FormsModule,
    DataTablesModule,
    BootstrapIconsModule.pick(allIcons)
  ]
})
export class AuctionModule { }
