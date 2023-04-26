import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { AuctionModule } from '../auction/auction.module';
import { FarmerModule } from '../farmer/farmer.module';



@NgModule({
  declarations: [ModalComponent],
  imports: [
    AuctionModule,
    CommonModule,
    FarmerModule
  ]
})
export class SharedModule { }
