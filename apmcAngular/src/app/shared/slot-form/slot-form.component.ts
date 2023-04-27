import { ItemService } from 'src/app/services/item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbDateStruct, NgbInputDatepicker, NgbCalendar, NgbDate  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-slot-form',
  templateUrl: './slot-form.component.html',
  styleUrls: ['./slot-form.component.scss']
})
export class SlotFormComponent implements OnInit{
  myForm !: FormGroup;
  maxDate: NgbDate;
  minDate : NgbDate;

  constructor(private fb: FormBuilder, private itemService : ItemService, private calendar: NgbCalendar) { 
    this.minDate = this.calendar.getToday();
    this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 2);
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      quantity: ['', Validators.required],
      itemType: ['', Validators.required],
      item: ['', Validators.required],
      date: ['', Validators.required]
    });

  }
  onSubmit(myForm : FormGroup) {
    if(myForm.valid){
      console.log(myForm.value);
    }
  }

  onClick(id : number){
    this.itemService.getAllItemsByTypeId(id);
  }

  onDateSelect(dp: NgbInputDatepicker) {
     setTimeout(() => {
      dp.close();
    }, 100);
  }

}
