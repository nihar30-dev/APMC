import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginComponent } from './google-login/google-login.component';

@NgModule({
  declarations: [
       GoogleLoginComponent,
       
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),

  ],
  exports:[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
