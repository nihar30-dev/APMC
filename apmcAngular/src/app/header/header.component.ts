<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorisation/service/auth.service';
import { StorageService } from '../utils/storage.service';
=======
import { Component } from '@angular/core';
import {AuthService} from "../authorisation/service/auth.service";
import {StorageService} from "../authorisation/service/storage.service";
>>>>>>> Stashed changes

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  
<<<<<<< Updated upstream
  constructor(private authService:AuthService,private storageService:StorageService){
  }

  ngOnInit(): void {
    
    this.storageService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });

    this.isLoggedIn = this.storageService.isLoggedIn();
    
   
  }

  logout(){
    this.storageService.clean();
  }

  //  hello(){
  //   console.log(this.isLoggedIn);
  //   this.authService.getIsLoggedIn().subscribe((data) => {
  //     this.isLoggedIn = data;
  //     console.log("isnide header component:",data);
  //   });  
=======
  constructor(private authService : AuthService , private storageService:StorageService){ }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
 
>>>>>>> Stashed changes
}
