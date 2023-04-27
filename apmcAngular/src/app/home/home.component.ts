import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { DailyRatesService } from '../services/daily-rates.service';
import { DailyRates } from '../models/dailyRates.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private dailyRates: DailyRatesService, public datepipe: DatePipe) {
  }
  // dailyRate : any;
  AlldailyRate!: DailyRates[];
  DRCommodities: DailyRates[] = [];
  DRFruits: DailyRates[] = [];
  DRVegetables: DailyRates[] = [];

  ngOnInit(): void {
    const myCarousel = document.querySelector('#myCarousel');
    if (myCarousel) {
      const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: true
      });
    }
    this.getPrices()
      .then(() => { this.drFilter(); });
  }
  getPrices() {
    const prmoise = new Promise((res, rej) => {
      const date = new Date('2023-04-24');
      const day: string = '' + this.datepipe.transform(date, 'yyyy-MM-dd');
      this.dailyRates.getDailyRatesBy(day).subscribe((data) => {
        this.AlldailyRate = data;
        if (this.AlldailyRate == null) {
          alert('No data for this day');
          return;
        }
        res(this.AlldailyRate);
      }, error => {
        rej(error);
      });
    });
    return prmoise;
  }
  drFilter() {

    this.AlldailyRate.forEach((dr) => {
      if (dr['item']['itemType']['itemTypeId'] == 1) {
        this.DRCommodities.push(dr);
      } else if (dr['item']['itemType']['itemTypeId'] == 2) {
        this.DRVegetables.push(dr);
      } else if (dr['item']['itemType']['itemTypeId'] == 3) {
        this.DRFruits.push(dr);
      }
    });
  }
}