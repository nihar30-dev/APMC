import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgClass} from "@angular/common";
import { HomeComponent } from './home/home.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';
import { SignupComponent } from './authorisation/signup/signup.component';
import { AddAgentComponent } from './add-agent/add-agent.component';

const routes: Routes = [
  {path: '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'login', component: UsernameLoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'home', component : HomeComponent},
  {path : 'agent', component: AddAgentComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass],
  exports: [RouterModule],

})
export class AppRoutingModule { }
