import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService, UserInfo } from '../services/googleApi/google-api.service';
 @Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  
  userInfo? : UserInfo;
  isLogIn = false;

  constructor(private router : Router, private readonly googleApi : GoogleApiService){ }
  ngOnInit(): void {
    this.isLogIn = this.isLoggedIn();
  }

  logIn(){
    this.router.navigate(['form']);
    console.log(this.isLogIn);
  }

  isLoggedIn(): boolean{
    return this.googleApi.isLoggedIn();
  }
  
  logout(){
    console.log(this.isLoggedIn());
    this.googleApi.signOut();
    console.log(this.isLoggedIn());
  }

}
