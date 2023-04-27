
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuctionModule } from './auction/auction.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BaseModule } from './base/base.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { StaticModule } from './static/static.module';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
