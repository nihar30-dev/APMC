import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent implements OnInit{

  items: Item[] = [];

  ngOnInit(){
 
  }

  date: NgbDateStruct | null = null;
  selectedDate: string = '';
  maxDate: NgbDate;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private itemService : ItemService, private calendar : NgbCalendar) {
    this.maxDate = calendar.getToday();
  }

  onDateSelect(dp: NgbInputDatepicker) {
    console.log(this.date);
    this.selectedDate = `${this.date?.year}/${(this.date?.month+'').padStart(2, '0')}/${(this.date?.day+'').padStart(2, '0')}`;
  }

  showContainer(typeId: number){
    if (this.selectedDate) {
      console.log('Selected date:', this.selectedDate);
        this.itemService.getAllItems(this.selectedDate, typeId).subscribe((data: Item[]) => {
        this.items = data;
        })

    } else {
      console.log('No date selected');
    }
  }

}
