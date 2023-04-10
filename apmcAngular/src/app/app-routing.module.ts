import { AuthModule } from './authorisation/loginManagment/auth.module';
import { NgModule } from '@angular/core';
// import { GoogleLoginComponent } from './authorisation/loginManagment/google-login/google-login.component';
import { UsernameLoginComponent } from './authorisation/loginManagment/username-login/username-login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path : 'form', component : UsernameLoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
