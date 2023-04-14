import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '../authorisation/auth.module';
import { UsernameLoginComponent } from '../authorisation/loginManagment/username-login/username-login.component';
import { SignupComponent } from '../authorisation/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {path : 'login', component : UsernameLoginComponent },
  {path : 'signup', component : SignupComponent},
  {path : 'home', component : HomeComponent}
];
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    AuthModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
