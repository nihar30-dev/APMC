import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { GoogleApiService } from './google-api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers :[GoogleApiService]
})
export class AppModule { }
