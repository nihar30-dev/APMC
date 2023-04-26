
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    this.activePage  = window.location.href.split('/').slice(-1)[0];
  }

  onClickHome(){
    
    this.activePage = 'home';
    this.router.navigate(['home']);
  }

  onClickAbout(){
    this.activePage = 'about';
    this.router.navigate(['about']);
  }

  onClickDailyRates(){
    this.activePage = 'dailyRates';
    if (this.role === 'user') {
      this.router.navigate(['adminRates']);
    } else {
      this.router.navigate(['userRates']);
    }
  }

  onClickSlotBooking(){
    this.activePage = 'slotBooking';
    this.router.navigate(['adminSlots']);
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
