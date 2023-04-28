import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { DailyRates } from 'src/app/models/dailyRates.model';
import { DailyRatesService } from 'src/app/services/daily-rates.service'

import { NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
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
  date: NgbDateStruct | null = null;
  selectedDate = '';
  maxDate: NgbDate;

  constructor( private itemService : ItemService, private calendar : NgbCalendar,private dailyRateService: DailyRatesService) {
    this.maxDate = calendar.getToday();
  }

  ngOnInit(){

    this.loadItemTypes();
    this.dailyRateService.getDailyRatesByDate('2023-04-25').subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      
    }, error =>{
      alert("No data found")
    })
  }

  //datepicker methods
  onDateSelect(dp: NgbInputDatepicker) {
    this.selectedDate = `${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`;
    setTimeout(() => {
      dp.close();
    }, 100);
    console.log(this.selectedDate);
    
    this.showContainer(1);
  }

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
  showContainer(a: number) {
    console.log("clicked");
    this.itemList = [];
    this.dailyRateService.getDailyRatesByDateAndItemType(this.selectedDate, a).subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      
    }, error =>{
      alert("No data found")
    })
    // this.loadItem(a)
    //   .then(() => this.initForm())
    //   .catch((error) => {
    //     console.log(error);
    //     alert(error);
    //   });
      this.activateSearch = true;
  }
}





import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from 'src/app/models/itemType.model';
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