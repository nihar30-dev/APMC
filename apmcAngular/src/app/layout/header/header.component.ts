import { AuthService } from 'src/app/authentication/service/auth.service';
import { StorageService } from 'src/app/authentication/service/storage.service';
import { Component, OnInit } from '@angular/core';

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

  openSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.classList.add('open');
    }
  }

  closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.classList.remove('open');
    }
  }
}
