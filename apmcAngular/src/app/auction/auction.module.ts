import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ViewSlotComponent } from './slot/view-slot/view-slot.component';import { AuthGuard } from '../auth/auth.guard';
import {allIcons} from 'ng-bootstrap-icons/icons';
import {BootstrapIconsModule} from 'ng-bootstrap-icons';
import {SharedModule} from '../shared/shared.module';



const routes: Routes = [
  {path : 'notice', component : NoticeComponent },
  {path : 'slot', component : SlotComponent ,canActivate:[AuthGuard] , data:{role:['AGENT','ADMIN','USER']}},
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
    NgbDatepickerModule,
    FormsModule,
    NgbAccordionModule,
    NgbModule,
    NgbDatepickerModule,
    DataTablesModule,
    BootstrapIconsModule.pick(allIcons),
    SharedModule
  ]
})
export class AuctionModule { }
