import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StorageService } from '../authorisation/service/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  // role: string = this.storageService.getUser().roles[0].toLowerCase();

  role:string = 'user';
  
  activePage : string = '';

  constructor(private router : Router, private route : ActivatedRoute,private storageService:StorageService){

  }

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
    this.router.navigate(['slotBooking']);
  }
  onClickViewSlot(){
    this.activePage = 'viewSlot';
    this.router.navigate(['viewSlot']);
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
