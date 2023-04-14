import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { UsernameLoginComponent } from './username-login/username-login.component';
import {FormsModule} from "@angular/forms";
import { SignupComponent } from '../signup/signup.component';
import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router'

const routes: Routes = [
  {path : 'login', component : UsernameLoginComponent },
  {path : 'signup', component : SignupComponent}
];

@NgModule({
  declarations: [
    UsernameLoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule,

  ],
  exports:[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
