import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { CommonModule } from '@angular/common';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShopsComponent } from './shops/shops.component';

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
export class BaseModule { }