import { __decorate } from "tslib";
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { CommonModule } from '@angular/common';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShopsComponent } from './shops/shops.component';
import { AuthGuard } from '../auth/auth.guard';
import { DataTablesModule } from 'angular-datatables';
const routes = [
    { path: 'shops', component: ShopsComponent, canActivate: [AuthGuard], data: { role: ['AGENT', 'ADMIN', 'USER'] } },
    { path: 'userRates', component: UserRatesComponent, canActivate: [AuthGuard], data: { role: ['USER', 'ADMIN', 'AGENT', 'default'] } },
    { path: 'adminRates', component: AdminRatesComponent, canActivate: [AuthGuard], data: { role: ['ADMIN'] } }
];
let BaseModule = class BaseModule {
};
BaseModule = __decorate([
    NgModule({
        declarations: [
            ShopsComponent,
            AdminRatesComponent,
            UserRatesComponent,
            FilterPipe
        ],
        imports: [
            RouterModule.forRoot(routes),
            CommonModule,
            DataTablesModule,
            SharedModule,
            ReactiveFormsModule,
            FormsModule,
            NgbModule
        ]
    })
], BaseModule);
export { BaseModule };
//# sourceMappingURL=base.module.js.map