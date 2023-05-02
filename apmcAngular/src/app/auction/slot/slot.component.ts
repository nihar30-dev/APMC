import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-admin-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit{
  
  myForm !: FormGroup;
  maxDate: NgbDate;
  minDate : NgbDate;
  datemodel : any;
  
  constructor(private modalService:ModalService, private fb: FormBuilder, public slotModal: NgbModal, private itemService : ItemService, private calendar: NgbCalendar) {
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


  open(content: any) {
    return this.slotModal.open(content, { centered: true });
  }

  onSubmitSlot(myForm : FormGroup) {
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
