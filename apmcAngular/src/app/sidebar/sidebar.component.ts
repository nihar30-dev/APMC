import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  role: string = '';

  constructor(private router : Router, private route : ActivatedRoute){

  }

  onClickHome(){
    this.router.navigate(['home']);
  }

  onClickAbout(){
    this.router.navigate(['about']);
  }

  onClickDailyRates(){
    this.role = 'user';
    if (this.role === 'admin') {
      console.log(this.route);
      this.router.navigate(['adminRates']);
    } else {
      this.router.navigate(['userRates']);
    }
  }

  onClickSlotBooking(){
    this.router.navigate(['slotBooking']);
  }
  onClickViewSlot(){
    this.router.navigate(['viewSlot']);
  }
  onClickShops(){
    this.router.navigate(['shops']);
  }
  onClickNotice(){
    this.router.navigate(['notice']);
  }
  onClickContact(){
    this.router.navigate(['contact']);
  }
  onClickGallery(){
    this.router.navigate(['gallery']);
  }

}
