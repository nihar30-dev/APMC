
import { AuthService } from 'src/app/authentication/service/auth.service';
import { StorageService } from 'src/app/utils/storage.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Chart, ChartType} from 'chart.js';

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

  createChart(){

    let chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
