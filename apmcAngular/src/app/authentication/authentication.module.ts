import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
  
const routes: Routes = [
  {path : 'login', component : LoginComponent },
  {path : 'signup', component : SignupComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
      CommonModule,
      HttpClientModule,
      OAuthModule.forRoot(),
      FormsModule,
      GoogleSigninButtonModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
    ],
  exports:[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
