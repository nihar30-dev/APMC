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
<<<<<<< HEAD
 
=======
      
>>>>>>> ee083ff (merged the changes from remote branch)
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

<<<<<<< HEAD
  showContainer(typeId: number){
    if (this.selectedDate) {
      console.log('Selected date:', this.selectedDate);
        this.itemService.getAllItems(this.selectedDate, typeId).subscribe((data: Item[]) => {
        this.items = data;
        })

=======
    const selectedDate = this.date;
    if (selectedDate) {
      console.log('Selected date:', selectedDate);
      this.itemService.getAllItems(selectedDate).subscribe((data: Item[]) => {
        this.items = data;
      })
>>>>>>> ee083ff (merged the changes from remote branch)
    } else {
      console.log('No date selected');
    }
  }
<<<<<<< HEAD

=======
>>>>>>> ee083ff (merged the changes from remote branch)
}
