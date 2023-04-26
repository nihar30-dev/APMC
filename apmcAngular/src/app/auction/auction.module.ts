import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { SlotComponent } from './slot/slot.component';
import { SlotFormComponent } from './slot/slot-form/slot-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  // {path : 'login', component : LoginComponent },
  // {path : 'signup', component : SignupComponent}
];
@NgModule({
  declarations: [
    NoticeComponent,
    SlotComponent,
    SlotFormComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuctionModule { }
