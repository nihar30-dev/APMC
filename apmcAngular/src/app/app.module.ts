import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { SignupComponent } from './authorisation/signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
      SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      CommonModule
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
