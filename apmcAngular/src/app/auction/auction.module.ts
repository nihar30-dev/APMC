import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path : 'notice', component : NoticeComponent },
  {path : 'slot', component : SlotComponent}
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
    SharedModule
  ]
})
export class AuctionModule { }
