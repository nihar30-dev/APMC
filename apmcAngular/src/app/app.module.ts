
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
import { MatMenuModule } from '@angular/material/menu';



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
    StaticModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
