
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  role = 'user';
  
  activePage  = '';

  constructor(private router : Router){}

  ngOnInit(): void {

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd ) {
        this.activePage  = window.location.href.split('/').slice(-1)[0];
      }
    });
  }

  onClickHome(){
    
    this.activePage = 'home';
    this.router.navigate(['home']);
  }

  onClickAbout(){
    this.activePage = 'aboutUs';
    this.router.navigate(['aboutUs']);
  }

  onClickDailyRates(){
    this.activePage = 'dailyRates';
    if (this.role === 'user') {
      this.router.navigate(['adminRates']);
    } else {
      this.router.navigate(['userRates']);
    }
  }

  onClickSlot(){
    this.activePage = 'slot';
    this.router.navigate(['slot']);
  }

  onClickShops(){
    this.activePage = 'shops';
    this.router.navigate(['shops']);
  }

  onClickNotice(){
    this.activePage = 'notice';
    this.router.navigate(['notice']);
  }

  onClickContact(){
    this.activePage = 'contact';
    this.router.navigate(['contact']);
  }

  onClickGallery(){
    this.activePage = 'gallery';
    this.router.navigate(['gallery']);
  }

}
