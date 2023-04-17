import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent implements OnInit{

  items: Item[] = [];

  ngOnInit(){
      // this.itemService.getAllItems(this.date).subscribe((data: Item[]) => {
      //   this.items = data;
      // })
  }

  date: NgbDateStruct | null = null;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private itemService : ItemService) {}

  onDateSelect(dp: NgbInputDatepicker) {
    console.log(this.date);

    const selectedDate = this.date;
    if (selectedDate) {
      console.log('Selected date:', selectedDate);
      // Add your logic here to handle the selected date


    } else {
      console.log('No date selected');
    }
  }

  // getDate(): Date | null {
  //   return this.date ? new Date(this.date.year, this.date.month - 1, this.date.day) : null;
  // }
}
