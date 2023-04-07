import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './components/loginManagment/google-login/google-login.component';
import { AuthModule } from './components/loginManagment/auth.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path : 'login', component:GoogleLoginComponent }
  // { path: 'login', loadChildren: () => import('./components/loginManagment/auth.module').then(m => m.AuthModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
