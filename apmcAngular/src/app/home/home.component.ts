import {Component, OnInit, ViewChild} from '@angular/core';
import * as bootstrap from 'bootstrap';
import { DailyRatesService } from '../services/daily-rates.service';
import { DailyRates } from '../models/dailyRates.model';
import {StorageService} from '../utils/storage.service';

import { DatePipe } from '@angular/common';
import { DateFormatter } from '../utils/dateFormatter';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';
import {ChartType} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild('myChart') lineChart = {nativeElement:true};
  
  constructor(private dailyRates : DailyRatesService, public datepipe: DatePipe,private dateformatter: DateFormatter,private storageService:StorageService, 
    private toster:ToastrService){
  }
  // dailyRate : any;
  AlldailyRate! : DailyRates[];
  DRCommodities : DailyRates[] = [];
  DRFruits : DailyRates[] = [];
  DRVegetables : DailyRates[] = [];
  role='';



  ngOnInit(): void {
    this.createChart();
    this.storageService.role$.subscribe(data => {
      this.role =data;
    });
    
    this.role = this.storageService.getRole();
    const myCarousel = document.querySelector('#myCarousel');
    if (myCarousel) {
      const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: true
      });
    }
    this.getPrices()
      .then(()=>{this.drFilter();})
      .catch((error)=>{ this.toster.error('SOmethng went wrong'); });
  
  }
  
  getPrices(){
    const prmoise = new Promise((res,rej)=>{
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const day:string = this.dateformatter.dateinyyyymmdd(date);
      console.log('todat date : ',day);

      this.dailyRates.getDailyRatesByDate(day).subscribe((data) => {
        this.AlldailyRate = data;
        if(this.AlldailyRate==null){
          this.toster.info('No rates for previous day');
          return;
        }
        res(this.AlldailyRate);
      }, error=>{
        rej(error);
      });
    });
    return prmoise;
  }
  drFilter(){
    this.AlldailyRate.forEach((dr)=>{
      if(dr['item']['itemType']['itemTypeId']==1){
        this.DRCommodities.push(dr);
      }else if(dr['item']['itemType']['itemTypeId']==2){
        this.DRVegetables.push(dr);
      }else if(dr['item']['itemType']['itemTypeId']==3){
        this.DRFruits.push(dr);
      }
    });
  }

  createChart(){

    const canvas = this.lineChart.nativeElement;


    let chart: Chart<ChartType, string[], string>;
    chart = new Chart('myCanvas', {
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
