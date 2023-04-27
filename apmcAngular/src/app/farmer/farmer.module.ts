import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops/shops.component';
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';

const routes : Routes = [
  { path: 'shops', component: ShopsComponent },
  { path: 'userRates', component: UserRatesComponent },
  { path: 'adminRates', component: AdminRatesComponent }
];


@NgModule({
  declarations: [
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    FilterPipe
  ],
  imports: [
    
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class FarmerModule { }
