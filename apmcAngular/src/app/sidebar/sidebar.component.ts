import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  role: string = 'user';
  activePage : string = 'home';

  constructor(private router : Router, private route : ActivatedRoute){

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
    this.role = 'user';
    if (this.role === 'admin') {
      console.log(this.route);
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
    this.activePage = 'shop';
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
