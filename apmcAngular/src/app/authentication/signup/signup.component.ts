import {AuthService} from '../service/auth.service';
import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {StorageService} from "../../utils/storage.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: any = {
    username: null,
    password: null,
    contact: null
  };
      
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService , private storageService:StorageService,
              private router:Router) { }




  onSubmit(): void {
    const { username, password,contact } = this.form;
    // const user:User = {...this.form};
    const user = new User(0,username,password,contact,[]);
    console.log(user);

    this.authService.register(user).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.authService.login(username,password).subscribe({
          next: data => {
            this.storageService.saveUser(data);

            this.roles = this.storageService.getUser().roles;
            this.router.navigate(['home']);
          }
        });
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
