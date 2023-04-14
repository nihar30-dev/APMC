import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { SignupComponent } from './authorisation/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
      SignupComponent,
      HeaderComponent,
      SidebarComponent,
      BaseComponent,
      FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
      FormsModule,
      CommonModule
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
