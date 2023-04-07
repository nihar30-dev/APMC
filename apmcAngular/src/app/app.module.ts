import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
  ],
  bootstrap: [AppComponent],
  providers :[],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
