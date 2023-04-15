import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../service/storage.service";
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.scss']
})
export class UsernameLoginComponent implements OnInit{

  form: any = {
    username: null,
    password: null
  };
  userInfo? : UserInfo;
  isLogIn = false;
  isLoggedInuser = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private readonly googleApi : GoogleApiService , private authService : AuthService ,
              private storageService : StorageService){}

  ngOnInit(): void {
    this.isLogIn = this.isLoggedIn();
  }

  signIn(){
 
    this.googleApi.signIn();
    console.log('hello');
    this.googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    });
    this.isLogIn = this.isLoggedIn();
    
  }

  onSubmit(f: NgForm){
    const { username, password } = this.form;
    console.log("this.form: " ,this.form);
    console.log("f ", f);

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedInuser = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  isLoggedIn(): boolean{
    
    return this.googleApi.isLoggedIn();
  }
  logout(){
    this.googleApi.signOut();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
