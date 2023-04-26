import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgClass } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NoticeComponent } from './auction/notice/notice.component';
import { SlotComponent } from './auction/slot/slot.component';
import { ShopsComponent } from './farmer/shops/shops.component';
import { UserRatesComponent } from './farmer/dailyRates/user-rates/user-rates.component';
import { AdminRatesComponent } from './farmer/dailyRates/admin-rates/admin-rates.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'userRates', component: UserRatesComponent },
  { path: 'adminRates', component: AdminRatesComponent },
  { path: 'adminSlots', component: SlotComponent },
  { path: 'notice', component: NoticeComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass ,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
