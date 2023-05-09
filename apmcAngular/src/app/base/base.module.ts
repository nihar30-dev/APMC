import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { CommonModule } from '@angular/common';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import {AuthGuard} from '../auth/auth.guard';
import {DataTablesModule} from 'angular-datatables';
import {PdfGeneratorComponent} from './shops/pdf-generator/pdf-generator.component';


const routes : Routes = [
  { path: 'shops', component: ShopsComponent ,canActivate:[AuthGuard] , data:{role:['AGENT','ADMIN','USER']}},
  { path: 'userRates', component: UserRatesComponent ,canActivate:[AuthGuard], data:{role:['USER','ADMIN','AGENT','default']} },
  { path: 'adminRates', component: AdminRatesComponent,canActivate:[AuthGuard] , data:{role:['ADMIN']} }
];


@NgModule({
  declarations: [
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    FilterPipe,
    PdfGeneratorComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
   
  ]
})
export class BaseModule { }
