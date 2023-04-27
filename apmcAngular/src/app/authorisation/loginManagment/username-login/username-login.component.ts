<<<<<<< Updated upstream
import { AuthService } from '../../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { StorageService } from '../../../utils/storage.service';
import {NgForm} from '@angular/forms';
import {SocialAuthService} from '@abacritt/angularx-social-login';

=======
import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';
import {AuthService} from '../../service/auth.service';
import {StorageService} from '../../service/storage.service';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
>>>>>>> Stashed changes



@Component({

  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.scss']
})
export class UsernameLoginComponent  implements OnInit{

  form: any = {
    username: null,
    password: null
  };


  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles = '';
  user:any;
  constructor(private authService: AuthService,
    private storageService: StorageService , private router:Router,
    private socialAuthService : SocialAuthService) { }

<<<<<<< Updated upstream
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.authService.googleSignin(user.idToken).subscribe({
        next:data => {
          this.storageService.saveUser(data);
=======
  constructor(private readonly googleApi : GoogleApiService , private authService : AuthService ,
              private storageService : StorageService , private router : Router){}
>>>>>>> Stashed changes

          this.storageService.emitRole();

<<<<<<< Updated upstream
          this.router.navigate(['home']);
        }
      });
    });
    this.storageService.role$.subscribe(data=>{
      this.roles = data;
=======
  signIn(){
 
    this.googleApi.signIn();
    this.googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info;
      console.log(info);
>>>>>>> Stashed changes
    });
  }


  onSubmit(f:NgForm) {
    const { username, password } = this.form;
<<<<<<< Updated upstream


    this.authService.login(username, password).subscribe({
      next: data => {

        this.storageService.saveUser(data);

        this.storageService.emitRole();
        this.router.navigate(['home']);
  
=======
    console.log('this.form: ' ,this.form);
    console.log('f ', f);

    this.authService.login(username, password).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedInuser = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['home']);

>>>>>>> Stashed changes
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });

  }

<<<<<<< Updated upstream
=======
  isLoggedIn(): boolean{
    
    return this.googleApi.isLoggedIn();
  }
  // logout(){
  //   this.googleApi.signOut();
  //
  // }



  reloadPage(): void {
    window.location.reload();
  }
>>>>>>> Stashed changes
}
