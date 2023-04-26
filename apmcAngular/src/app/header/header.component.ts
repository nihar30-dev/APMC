import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorisation/service/auth.service';
import { StorageService } from '../authorisation/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  
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
}
