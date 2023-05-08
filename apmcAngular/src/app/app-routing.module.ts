import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgClass } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'dashboard' , component:DashboardComponent , canActivate:[AuthGuard],data:{role:['ADMIN']}}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass ,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
