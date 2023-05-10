import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/utils/storage.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  role = 'default';
  activePage  = '';
  @Input() isExpanded = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor(private router : Router , private storageService:StorageService){}

  ngOnInit(): void {

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd ) {
        this.activePage  = window.location.href.split('/').slice(-1)[0];
      }
      this.storageService.role$.subscribe(data => {
        this.role =data;
      });
      this.role = this.storageService.getRole();
    });
  }

  onClickHome(){
    this.activePage = 'home';
    if(this.role!=='ADMIN') {
      this.router.navigate(['home']);
      console.log('inside home');
    }
    else {
      this.router.navigate(['dashboard']);
    }
  }

  onClickAbout(){
    this.activePage = 'aboutUs';
    this.router.navigate(['aboutUs']);
  }

  onClickDailyRates(){
    this.activePage = 'dailyRates';
    this.router.navigate(['userRates']);
  }

  onClickViewSlot(){
    this.activePage = 'viewSlot';
    this.router.navigate(['viewSlot']);
  }

  onClickAdminRates()
  {

    this.activePage = 'dailyRates';
    this.router.navigate(['adminRates']);
  }
  onClickSlot(){
    this.activePage = 'slot';
    if(this.storageService.getUser().userDetailsExist){
      this.router.navigate(['slot']);
    }else{
      if(this.role==='ADMIN'){
        this.router.navigate(['slot']);
      }else{
        Swal.fire({
          icon: 'info',
          title: 'Profile Error',
          text: 'complete profile first!',
          confirmButtonColor:'#314731',
          confirmButtonText:'Go to Profile'
        }).then(() => {
          this.router.navigate(['profile']);
        });
      }
    }
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

  onClickProfile(){
    this.activePage = 'profile';
    this.router.navigate(['profile']);
  }

}
