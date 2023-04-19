import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { AuthModule } from './authorisation/auth.module';
import { HomeComponent } from './home/home.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShopsComponent } from './shops/shops.component';
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentFormComponent } from './agent-form/agent-form.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppComponent,
    HomeComponent,
    AddAgentComponent,
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    AgentFormComponent,
    AgentFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    AuthModule,
<<<<<<< HEAD
=======
    NgbModule,
>>>>>>> ee083ff (merged the changes from remote branch)
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
