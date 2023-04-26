import { Component, OnInit } from '@angular/core';

import * as bootstrap from 'bootstrap';
import { DailyRatesService } from '../services/daily-rates.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private dailyRates : DailyRatesService){

  }

  dailyRate : any;

  ngOnInit(): void {


    const myCarousel = document.querySelector('#myCarousel');
    if (myCarousel) {
      const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: true
      });
    }

    this.getPrices();
  
  }

  getPrices(){

    this.dailyRates.getDailyRatesBy('2023-04-24').subscribe((data) => {
      this.dailyRate = data;

    
    
    });
  }

}