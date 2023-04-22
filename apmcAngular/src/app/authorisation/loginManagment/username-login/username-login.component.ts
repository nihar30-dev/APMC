import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../services/googleApi/google-api.service';
import { AuthService } from "../../service/auth.service";
import { StorageService } from "../../service/storage.service";
import { NgForm } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import {Router } from '@angular/router';


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

  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
    private storageService: StorageService , private router:Router) { }

  googleSignIn(){
    // setTimeout(() => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id:
            '238985952076-ip1l9j07bci4474ajuklhed9nvp3rskc.apps.googleusercontent.com',
          callback: this.handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
          theme: 'outline',
          size: 'large',
        });
        google.accounts.id.prompt();
      }
    // }, 1000);
  }

    ngOnInit(): void {}

  handleCredentialResponse = (response: any) => {
    const idToken = response.credential;
    this.decodedToken = jwt_decode(idToken);
    localStorage.setItem("decodedToken", this.decodedToken);
    console.log(this.decodedToken);
    this.router.navigate(['/home']);
  };

  // handleCredentialResponse = (response: any) => {
  //   console.log(response);
  //   const idToken = response.credential;
  //   this.decodedToken = jwt_decode(idToken);
  //   console.log(this.decodedToken);
  //   this.authService.gAuthenticate(this.decodedToken).subscribe((res: any) => {
  //     // this.router.navigate(['/home']);
  //     // localStorage.setItem('token', 'Bearer ' + res.token);
  //   });
  // };


  onSubmit(f: NgForm) {
    const { username, password } = this.form;
    console.log("this.form: ", this.form);
    console.log("f ", f);

    this.authService.login(username, password).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['home']);
  
      },
      error: err => {
        this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    });

  }

  // isLoggedIn(): boolean {

  //   return this.googleApi.isLoggedIn();
  // }
  // logout() {
  //   this.googleApi.signOut();
  // }

  reloadPage(): void {
    window.location.reload();
  }
}
