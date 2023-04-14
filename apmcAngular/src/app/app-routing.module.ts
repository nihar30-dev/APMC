import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgClass} from "@angular/common";
import { HomeComponent } from './home/home.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass],
  exports: [RouterModule],

})
export class AppRoutingModule { }
