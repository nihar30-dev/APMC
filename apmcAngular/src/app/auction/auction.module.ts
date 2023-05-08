import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderMaskComponent } from '../shared/loader-mask/loader-mask.component';


const routes: Routes = [
  {path : 'notice', component : NoticeComponent },
  {path : 'slot', component : SlotComponent}
];
@NgModule({
  declarations: [
    NoticeComponent,
    SlotComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
    NgbAccordionModule,
    NgbModule,
    SharedModule,
    NgbDatepickerModule
  ]
})
export class AuctionModule { }
