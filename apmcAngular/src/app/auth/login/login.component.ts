import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly clientId = '238985952076-6b209kb4mvjvdqjcm1d42o1scsolf33l.apps.googleusercontent.com';
  user: any;
  loggedIn: any;

  constructor(private authService: SocialAuthService) {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId
      });
    });
   }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(this.user);
  }


  onSignIn() {
    gapi.auth2.getAuthInstance().signIn({
      prompt: 'select_account'
    }).then((googleUser: any) => {
      const token = googleUser.getAuthResponse().id_token;
      
      // Do something with the token, like send it to your server for authentication


      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      console.log(this.user);


      // this.http.post(this.authUrl, { token }).subscribe(response => {
      //   // Handle successful authentication on the server
      // }, error => {
      //   // Handle authentication error
      // });
    });
  }

}