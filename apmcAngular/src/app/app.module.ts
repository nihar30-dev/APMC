
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ModalComponent } from './modal/modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ShopsComponent } from './shops/shops.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { BaseModule } from './base/base.module';
import { AuctionModule } from './auction/auction.module';
import { LayoutModule } from './layout/layout.module';
import { StaticModule } from './static/static.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    StaticModule
  ],
  bootstrap: [AppComponent],
  providers :[
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
