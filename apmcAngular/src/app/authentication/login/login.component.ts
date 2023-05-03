import { AuthService } from '../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { StorageService } from 'src/app/utils/storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import {ToastrService} from "ngx-toastr";




@Component({
  selector: 'app-username-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{





  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles = '';
  user!: SocialUser;
  loginForm!: FormGroup;
  constructor(private authService: AuthService,
    private storageService: StorageService , private router:Router,   private socialAuthService: SocialAuthService
    ,private fb: FormBuilder , private toastService:ToastrService) { }

    
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.authService.googleSignin(user.idToken).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.storageService.emitRole();
          this.router.navigate(['home']);
        }
      });
    });
    this.storageService.role$.subscribe(data => {
      this.roles = data;
    });

    //
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]]!,
      password: ['', [Validators.required, Validators.minLength(8)]]!
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const{username,password} = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: data => {

          this.storageService.saveUser(data);


          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['home']);
          this.toastService.success('Login Successfully');
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.toastService.error('Incorrect Username or Password');
        }
      });
    }
  }


  // onSubmit(f:NgForm) {
  //
  //   //
  //   const { username, password } = this.form;
  //
  //
  //   this.authService.login(username, password).subscribe({
  //     next: data => {
  //
  //       this.storageService.saveUser(data);
  //
  //       this.roles = this.storageService.getUser().roles;
  //       this.router.navigate(['home']);
  //
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //     }
  //   });
  //
  // }


}
