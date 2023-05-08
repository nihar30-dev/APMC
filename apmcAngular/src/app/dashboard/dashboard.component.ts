import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DailyRates} from '../models/dailyRates.model';
import Chart from 'chart.js/auto';
import {StorageService} from '../utils/storage.service';
import {DailyRatesService} from '../services/daily-rates.service';
import {ItemType} from '../models/itemType.model';
import {Item} from '../models/item.model';
import {ItemService} from '../services/item.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateParserFormatter} from '../base/dailyRates/CustomDateParserFormatter';
import {DateFormatter} from '../utils/dateFormatter';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class DashboardComponent implements OnInit{
  @ViewChild('myChart') lineChart :ElementRef | undefined;
  @ViewChild('incomeChart') linechart2:ElementRef | undefined;
  showChart = false;
  role = '';
  rates:DailyRates[] = [];
  myForm !: FormGroup;
  model2:any;
  day = '';
  chart:any;
  incomeChart:any;
  itemTypes!: ItemType[];

  itemsList!: Item[];
  active = 0;
  date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());


  constructor(private storageService:StorageService , private dailyRatesSerivce : DailyRatesService,
              private itemService:ItemService , private toaster:ToastrService, private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>,
              private dateFormatter: DateFormatter,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.active = 0;
    const date = new Date();
    this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday());
    this.day = this.dateFormatter.dateinyyyymmdd(date);

    this.myForm = this.fb.group({
      itemType: ['', Validators.required],
      item: ['', Validators.required]
    });

    this.loadItemTypes();
    this.storageService.role$.subscribe(data => {
      this.role = data;
    });

    this.role = this.storageService.getRole();
  }

  // ItemTypes loading API
  loadItemTypes() {
    this.itemService.getItemTypes().subscribe((data) => {
      this.itemTypes = data;
    }, () => {
      this.toaster.error('Error loading Item Types');
    });
  }


  // Item loading API
  loadItem() {
    const n = +(<HTMLInputElement>document.getElementById('itemTypeId')).value;
    this.itemsList = [];
    this.itemService.getAllItemsByTypeId(n).subscribe((data) => {
      this.itemsList = data;
    }, () => {
      this.toaster.error('Error loading Item');
    });
  }

  onSubmit(myForm:FormGroup){
    this.myForm = myForm;
    this.dailyRatesSerivce.getAlldailyRates().subscribe((data) => {
      this.rates = data;
      this.createChart();
      this.showChart = true;
    });
  }

  
  //creation of chart
  createChart() {
    const rates1: DailyRates[] = [];
    this.rates.forEach((dr) => {
      if (dr['item']['itemId'] == this.myForm.value.item) {
        rates1.push(dr);
      }
    }
    );


    const day: string[] =[],
      minPrice: number[]=[],
      maxPrice: number[]=[],
      income:number[] = [];
    rates1.forEach((r) => {
      day.push(r.day);
      maxPrice.push(r.maxPrice);
      minPrice.push(r.minPrice);
      income.push(r.quantity);
    });


    setTimeout(() => {
      this.showChart = true;
      if(this.chart || this.incomeChart){
        this.chart.destroy();
        this.incomeChart.destroy();
      }
      this.chart = new Chart(this.lineChart?.nativeElement, {
        type: 'line',

        data: {
          labels:day,
          datasets: [
            {
              label: 'Max Price',
              data:maxPrice,
              backgroundColor: 'green'
            },
            {
              label: 'Min Price',
              data:minPrice,
              backgroundColor: 'red'
            }
          ]
        },
        options: {
          aspectRatio: 2.5,
          responsive:true,
          plugins:{
            title: {
              display: true,
              text:  rates1[0].item.itemName,
              padding: {
                top: 10,
                bottom: 30
              }
            }
          }

        },});

      //income chart
      this.incomeChart = new Chart(this.linechart2?.nativeElement, {
        type: 'line',

        data: {
          labels:day,
          datasets: [
            {
              label: 'income',
              data:income,
              backgroundColor: 'green'
            }
          ]
        },
        options: {
          aspectRatio: 2.5,
          plugins:{
            title: {
              display: true,
              text:  rates1[0].item.itemName,
              padding: {
                top: 10,
                bottom: 30
              }
            }
          }

        },});


    },500);
  }




}
