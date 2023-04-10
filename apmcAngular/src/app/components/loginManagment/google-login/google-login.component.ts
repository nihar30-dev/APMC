import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit{
  title = 'APMC';

  userInfo? : UserInfo
  isLogIn :Boolean = false

  ngOnInit(): void {
      this.isLogIn = this.isLoggedIn()
  }
  constructor(private readonly googleApi : GoogleApiService){ }

  logIn(){
    this.isLogIn = this.isLoggedIn()
    this.googleApi.signIn();
    this.googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }
  isLoggedIn():Boolean{
    console.log("hello");
    return this.googleApi.isLoggedIn()
  }
  logout(){
    this.googleApi.signOut()
  }
}
