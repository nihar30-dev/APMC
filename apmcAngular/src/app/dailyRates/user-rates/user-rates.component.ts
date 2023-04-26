import { Component } from '@angular/core';
// import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent{

  items: DailyRates[] = [];
  activateSearch = false;
  searchQuery = '';

  date: NgbDateStruct | null = null;
  selectedDate = '';
  maxDate: NgbDate;

  constructor( private itemService : ItemService, private calendar : NgbCalendar) {
    this.maxDate = calendar.getToday();
  }



  //datepicker methods 
  onDateSelect(dp: NgbInputDatepicker) {
    this.selectedDate = `${this.date?.year}/${(this.date?.month+'').padStart(2, '0')}/${(this.date?.day+'').padStart(2, '0')}`;
    setTimeout(() => {
      dp.close();
    }, 100);
    this.showContainer(1);
  }

  // list methods 
  showContainer(typeId: number){
    if (this.selectedDate) {

      // this.itemService.getAllItemsByDate(this.selectedDate, typeId);

      this.activateSearch = true;
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

