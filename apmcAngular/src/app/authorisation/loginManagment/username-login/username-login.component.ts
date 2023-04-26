import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';
import { NgForm } from '@angular/forms'; 
import {Router } from '@angular/router';


declare let google: any;

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


  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
    private storageService: StorageService , private router:Router) { }

    
  ngOnInit(): void {
      
  }



  onSubmit(f: NgForm) {
    const { username, password } = this.form;
    console.log('this.form: ', this.form);
    console.log('f ', f);

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
