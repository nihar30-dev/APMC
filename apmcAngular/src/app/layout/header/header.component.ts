
import { AuthService } from 'src/app/authentication/service/auth.service';
import { StorageService } from 'src/app/utils/storage.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  imageURL = null;

  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  constructor(private authService:AuthService,private storageService:StorageService,private router:Router){
  }

  ngOnInit(): void {

    this.storageService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();


  }

  sidebar(){
    this.router.navigate(['userRates']);
  }
  logout(){
    this.storageService.clean();
  }

}
