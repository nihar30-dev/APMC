import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-slot-form',
  templateUrl: './slot-form.component.html',
  styleUrls: ['./slot-form.component.scss']
})
export class SlotFormComponent implements OnInit{

  myForm !: FormGroup;
  itemsList!: Item[];
  
  constructor(private fb: FormBuilder, private itemService : ItemService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      quantity: ['', Validators.required],
      itemType: ['', Validators.required],
      item : ['', Validators.required]
    });

  }
  onSubmit(myForm : FormGroup) {
    console.log(myForm.value);
  }

  onClick(id : number){
    this.itemService.getAllItemsByTypeId(id);
  }
}
