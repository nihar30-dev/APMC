import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { AdminSlotComponent } from './slot/admin-slot/admin-slot.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './authorisation/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ModalComponent } from './modal/modal.component';
import {SocialLoginModule , SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {GoogleLoginProvider} from '@abacritt/angularx-social-login';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ShopsComponent } from './shops/shops.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FilterPipe, UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SlotFormComponent } from './slot/admin-slot/slot-form/slot-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {InterceptorService} from './utils/interceptor.service';
import {StorageService} from './utils/storage.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppComponent,
    HomeComponent,
    ShopsComponent,
    AdminRatesComponent,
    UserRatesComponent,
    AgentFormComponent,
    ShopFormComponent,
    ModalComponent,
    FilterPipe,
    ItemFormComponent,
    AdminSlotComponent,
    SlotFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    AuthModule,
    NgbModule,
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
