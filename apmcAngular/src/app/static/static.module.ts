import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] , data:{role:['AGENT','ADMIN','USER']} }
];


@NgModule({
  declarations: [
    AboutUsComponent,
    ContactComponent,
    GalleryComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ]
})
export class StaticModule { }
