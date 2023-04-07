import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig : AuthConfig = {
  issuer : 'https://accounts.google.com',
  strictDiscoveryDocumentValidation : false,
  redirectUri : window.location.origin,
  clientId : '238985952076-6b209kb4mvjvdqjcm1d42o1scsolf33l.apps.googleusercontent.com',
  scope : 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService : OAuthService) {
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then(()=> {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow()
        }
        else{
          oAuthService.loadUserProfile().then((userProfile) => {
              console.log(JSON.stringify(userProfile))
          })
        }
      })
    })
   }
}
