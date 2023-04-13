import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.scss']
})
export class UsernameLoginComponent implements OnInit{

  userInfo? : UserInfo;
  isLogIn = false;

  constructor(private readonly googleApi : GoogleApiService){}

  ngOnInit(): void {
    this.isLogIn = this.isLoggedIn();
  }

  signIn(){
    this.googleApi.signIn();
    this.googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    });
    this.isLogIn = this.isLoggedIn();
    console.log(this.isLogIn);
  }

  isLoggedIn(): boolean{
    return this.googleApi.isLoggedIn();
  }

  logout(){
    this.googleApi.signOut();
  }

}
