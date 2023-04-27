
import { AuthService } from '../../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { StorageService } from '../../../utils/storage.service';
import {NgForm} from '@angular/forms';
import {SocialAuthService} from '@abacritt/angularx-social-login';

import { GoogleApiService, UserInfo } from '../../../services/googleApi/google-api.service';





@Component({

  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.scss']
})
export class UsernameLoginComponent  implements OnInit {

  form: any = {
    username: null,
    password: null
  };


  // isLoggedInuser = false;
  // isLoginFailed = false;
  errorMessage = '';
  roles = '';
  user: any;

  constructor(private authService: AuthService,
                private storageService: StorageService, private router: Router,
                private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
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


  onSubmit(f: NgForm) {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe(data => {

      this.storageService.saveUser(data);
      this.storageService.emitRole();
      this.router.navigate(['home']);
    });
  }

}

  









