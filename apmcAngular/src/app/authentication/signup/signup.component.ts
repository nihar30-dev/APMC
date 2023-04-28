import {AuthService} from '../service/auth.service';
import { Component } from '@angular/core';
import {User} from '../../models/user.model';

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

  constructor(private authService: AuthService) { }




  onSubmit(): void {
    const { username, password,contact } = this.form;
    const user:User = {...this.form};

    this.authService.register(user).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
