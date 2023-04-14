import { AuthModule } from './authorisation/loginManagment/auth.module';
import { NgModule } from '@angular/core';
// import { GoogleLoginComponent } from './authorisation/loginManagment/google-login/google-login.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./authorisation/signup/signup.component";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {path: 'home', component: BaseComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, NgClass, FormsModule],
  exports: [RouterModule],

})
export class AppRoutingModule { }
