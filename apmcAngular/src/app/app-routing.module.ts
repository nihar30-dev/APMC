import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgClass} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';
import { SignupComponent } from './authorisation/signup/signup.component';
import { ShopsComponent } from './shops/shops.component';
import { AdminRatesComponent } from './dailyRates/admin-rates/admin-rates.component';
import { UserRatesComponent } from './dailyRates/user-rates/user-rates.component';
import { AppComponent } from './app.component';
import {AdminSlotComponent} from './slot/admin-slot/admin-slot.component';


const routes: Routes = [
  {path: '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'login', component: UsernameLoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'home', component : HomeComponent},
  {path : 'shops', component: ShopsComponent},
  {path: 'userRates', component: UserRatesComponent },
  {path: 'adminRates', component: AdminRatesComponent },
  {path: 'adminSlots' , component:AdminSlotComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass ,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
