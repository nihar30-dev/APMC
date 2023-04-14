import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './authorisation/auth.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
      FormsModule,
      CommonModule,
      AuthModule,
      SharedModule
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
