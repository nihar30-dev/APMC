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
import {AuthGuard} from "../auth/auth.guard";
import {MatTabsModule} from "@angular/material/tabs";


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
    FilterPipe
  ],
    imports: [

        RouterModule.forRoot(routes),
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
   
    ]
})
export class BaseModule { }
