import { AuthService } from '../service/auth.service';
import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import {NgForm} from '@angular/forms';




@Component({
  selector: 'app-username-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

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

    



  onSubmit(f:NgForm) {
    const { username, password } = this.form;


    this.authService.login(username, password).subscribe({
      next: data => {

        this.storageService.saveUser(data);

        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['home']);
  
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });

  }

}
