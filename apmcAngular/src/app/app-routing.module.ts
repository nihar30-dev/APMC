import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgClass } from '@angular/common';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgClass ,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
