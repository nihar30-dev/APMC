import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  {path : 'notice', component : NoticeComponent },
  {path : 'slot', component : SlotComponent ,canActivate:[AuthGuard] , data:{role:['AGENT','ADMIN','USER']}}
];
@NgModule({
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
export class AuctionModule { }
