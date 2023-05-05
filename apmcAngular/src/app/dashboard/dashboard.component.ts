import {Component, ElementRef, ViewChild} from '@angular/core';
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
import {Slot} from '../models/slot.model';
import {CustomDateParserFormatter} from '../base/dailyRates/CustomDateParserFormatter';
import {DateFormatter} from '../utils/dateFormatter';
import {asapScheduler, async, asyncScheduler} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class DashboardComponent {
  @ViewChild('myChart') lineChart :ElementRef | undefined;
  showChart = false;
  role = '';
  rates:DailyRates[] = [];
  myForm !: FormGroup;
  model2:any;
  day = '';
  chart:any;
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

  loadItemTypes() {
    this.itemService.getItemTypes().subscribe((data) => {
      this.itemTypes = data;
    }, () => {
      this.toaster.error('Error loading Item Types');
    });
  }

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
    console.log(myForm.value);
    this.dailyRatesSerivce.getAlldailyRates().subscribe((data) => {
      this.rates = data;
      this.createChart(myForm);
    });





  }

  
  
  createChart(myForm:FormGroup) {

    const rates1: DailyRates[] = [];

    this.rates.forEach((dr) => {
      if (dr['item']['itemId'] == myForm.value.item) {
        rates1.push(dr);
      }
    }
    );



  

    console.log(myForm.value.item);
    console.log(rates1);

    const day: string[] =[],minPrice: number[]=[],maxPrice: number[]=[];
    rates1.forEach((r) => {
      day.push(r.day);
      maxPrice.push(r.maxPrice);
      minPrice.push(r.minPrice);
    });


    console.log('inside create chart');
    this.showChart = true;
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
        plugins:{
          title: {
            display: true,
            text: 'apple' ,
            padding: {
              top: 10,
              bottom: 30
            }
          }
        }

      },});
  }




}
