import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';
import { AuthService } from "../../service/auth.service";
import { StorageService } from "../../service/storage.service";
import { NgForm } from '@angular/forms';
import jwt_decode from 'jwt-decode';


declare var google: any;

@Component({
  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.scss']
})
export class UsernameLoginComponent implements OnInit {

  decodedToken: any;
  form: any = {
    username: null,
    password: null
  };
  userInfo?: UserInfo;
  isLogIn = false;
  isLoggedInuser = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private readonly googleApi: GoogleApiService, private authService: AuthService,
    private storageService: StorageService) { }

  ngOnInit(): void {

    setTimeout(() => {
      console.log(typeof this.handleCredentialResponse)
      google.accounts.id.initialize({
        client_id:
          '877272810140-p9m45jqdf7d1lnc2rd5tr9ovtq3ti2j3.apps.googleusercontent.com',
          
            callback:this.handleCredentialResponse,
      });
      google.accounts.id.prompt();
    }, 1000);

  }

  handleCredentialResponse = (response: any) => {
    try{alert("Hii")
    console.log(response);
    const idToken = response.credential;
    this.decodedToken = jwt_decode(idToken);
    localStorage.setItem("decodedToken", this.decodedToken);
    console.log(this.decodedToken);}
    catch(e){
      alert("hiii")
    }
  };

  // hadnleGoogleLoginPrompt = (client_id:string,callback:any){

  // }

  // signIn(){

  //   this.googleApi.signIn();
  //   console.log('hello');
  //   this.googleApi.userProfileSubject.subscribe( info => {
  //     this.userInfo = info;
  //   });
  //   this.isLogIn = this.isLoggedIn();

  // }

  onSubmit(f: NgForm) {
    const { username, password } = this.form;
    console.log("this.form: ", this.form);
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

  isLoggedIn(): boolean {

    return this.googleApi.isLoggedIn();
  }
  logout() {
    this.googleApi.signOut();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
