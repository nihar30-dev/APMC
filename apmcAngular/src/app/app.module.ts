import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from './authorisation/auth.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShopsComponent } from './shops/shops.component';
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppComponent,
    HomeComponent,
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    AgentFormComponent,
    ShopFormComponent,
    ModalComponent,
    FilterPipe
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    AuthModule,
    NgbModule,
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
