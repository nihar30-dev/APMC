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
