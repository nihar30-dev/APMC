import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { UsernameLoginComponent } from './username-login/username-login.component';


@NgModule({
  declarations: [
    UsernameLoginComponent
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
