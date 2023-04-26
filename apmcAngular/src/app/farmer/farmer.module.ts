import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops/shops.component';
import { AgentFormComponent } from './shops/agent-form/agent-form.component';
import { ShopFormComponent } from './shops/shop-form/shop-form.component';
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { ItemFormComponent } from './dailyRates/admin-rates/item-form/item-form.component';
import { UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    AgentFormComponent,
    ShopFormComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FarmerModule { }
