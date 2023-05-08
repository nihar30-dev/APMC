
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { BaseModule } from './base/base.module';
import { AuctionModule } from './auction/auction.module';
import { LayoutModule } from './layout/layout.module';
import { StaticModule } from './static/static.module';
import {NgChartsModule } from 'ng2-charts';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginProvider, SocialAuthServiceConfig,SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './utils/interceptor.service';
import { StorageService } from './utils/storage.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    AuthenticationModule,
    SharedModule,
    BaseModule,
    LayoutModule,
    AuctionModule,
    StaticModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbInputDatepicker,

  ],
  bootstrap: [AppComponent],
  providers :[
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '238985952076-ip1l9j07bci4474ajuklhed9nvp3rskc.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
      deps: [StorageService],
    }
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
