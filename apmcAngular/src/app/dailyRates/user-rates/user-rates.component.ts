import { Component, OnInit } from '@angular/core';
// import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent implements OnInit{

  items: DailyRates[] = [];
  item : any;
  activateSearch: boolean = false;
  searchQuery: string = '';

  date: NgbDateStruct | null = null;
  selectedDate: string = '';
  maxDate: NgbDate;

  constructor( private itemService : ItemService, private calendar : NgbCalendar) {
    this.maxDate = calendar.getToday();
  }


  ngOnInit(){
      
  }

  //datepicker methods 
  onDateSelect(dp: NgbInputDatepicker) {
    console.log(this.date);
    this.selectedDate = `${this.date?.year}/${(this.date?.month+'').padStart(2, '0')}/${(this.date?.day+'').padStart(2, '0')}`;
    console.log("hi")
    setTimeout(() => {
        dp.close();
      }, 100);
    this.showContainer(1);
  }

  // list methods 
  showContainer(typeId: number){
    if (this.selectedDate) {
      console.log('Selected date:', this.selectedDate);
        this.itemService.getAllItemsByDate(this.selectedDate, typeId)
        // .subscribe((data: Item[]) => {
        // this.items = data;
        // })
       this.activateSearch = true;
    } else {
      console.log('No date selected');
    }
  }
  }



  import { Pipe, PipeTransform } from '@angular/core';
import { DailyRates } from 'src/app/models/dailyRates.model';

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

  