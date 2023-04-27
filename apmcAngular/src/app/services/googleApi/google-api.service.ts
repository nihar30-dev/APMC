import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig : AuthConfig = {
  issuer : 'https://accounts.google.com',
  strictDiscoveryDocumentValidation : false,
  redirectUri : window.location.origin,
  clientId : '238985952076-6b209kb4mvjvdqjcm1d42o1scsolf33l.apps.googleusercontent.com',
  scope : 'openid profile email'
};

export interface UserInfo{
  info :{
    sub : string,
    email : string,
    name : string,
    picture : string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>();

  constructor(private readonly oAuthService : OAuthService) {

  }

  signIn(){
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';
    this.oAuthService.loadDiscoveryDocument().then(()=> {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if(!this.oAuthService.hasValidAccessToken()){
          this.oAuthService.initLoginFlow();
        }
        else{
          this.oAuthService.loadUserProfile().then((userProfile) => {
            console.log(userProfile);
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  isLoggedIn(){
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(){
    this.oAuthService.logOut();
  }

}
