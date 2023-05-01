import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { DailyRates } from 'src/app/models/dailyRates.model';
import { DailyRatesService } from 'src/app/services/daily-rates.service'
import { NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent implements OnInit{

  items: DailyRates[] = [];
  itemList! : DailyRates[];
  itemTypes! : ItemType[];
  
  activateSearch = false;
  searchQuery = '';
  date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  selectedDate = '';
  maxDate: NgbDate;

  constructor( 
    private itemService : ItemService,
    private dateformatter: DateFormatter, 
    private calendar : NgbCalendar,
    private dailyRateService: DailyRatesService,
    private toastr: ToastrService)
  {
    this.maxDate = calendar.getToday();
  }

  ngOnInit(){
    let date = new Date();
    let day:string = this.dateformatter.dateinyyyymmdd(date);
    this.selectedDate = day;
    this.loadItemTypes();
    this.dailyRateService.getDailyRatesByDate(day).subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      this.showContainer(0);
    }, error =>{
      this.toastr.info('No rates for this date');
      console.log(this.toastr);
      
    })
  }

  //datepicker methods
  onDateSelect(dp: any) {
    console.log(dp);
    // this.selectedDate = `${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`;
    // setTimeout(() => {
    //   // dp.close();
    // }, 100);
    let day2:string = this.dateformatter.dateinyyyymmdd(dp);
    this.selectedDate =day2;
    console.log(this.selectedDate);
    
    this.showContainer(0);
  }

  //load ItemTypes
  loadItemTypes() {

    const promise = new Promise((res, rej) => {
      this.itemService.getItemTypes().subscribe((data) => {
        this.itemTypes = data;
        res(this.itemTypes)
      }, (error) => {
        rej(error);
      })
    })
    return promise;
  }


  // list methods
  showContainer(a: any) {
    console.log(a);
    this.itemList = [];
    this.dailyRateService.getDailyRatesByDateAndItemType(this.selectedDate, a+1).subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      if(this.itemList.length == 0)
        this.toastr.info("No data found")
      console.log(this.itemList);
      
    }, error =>{
      this.toastr.error("No data found");
    })
    // this.loadItem(a)
    //   .then(() => this.initForm())
    //   .catch((error) => {
    //     console.log(error);
    //     alert(error);
    //   });
      this.activateSearch = true;
  }

  protected readonly indexedDB = indexedDB;
  model2: any;
}


import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from 'src/app/models/itemType.model';
import { DateFormatter } from 'src/app/utils/dateFormatter';
  @Pipe({
    name: 'filter'
  })
export class FilterPipe implements PipeTransform {
  transform(items: DailyRates[], searchQuery: string): any[] {
    if (!items || !searchQuery) {
      return items;
    }
    return items.filter(item => item['item']['itemName'].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  }
}
