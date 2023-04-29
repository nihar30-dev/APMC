import { AuthService } from '../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { StorageService } from 'src/app/utils/storage.service';
import {NgForm} from '@angular/forms';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";




@Component({
  selector: 'app-username-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: any = {
    username: null,
    password: null
  };


  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles = '';
   user!: SocialUser;

  constructor(private authService: AuthService,
    private storageService: StorageService , private router:Router,   private socialAuthService: SocialAuthService) { }

    
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
}


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
