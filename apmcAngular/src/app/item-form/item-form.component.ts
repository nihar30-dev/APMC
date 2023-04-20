import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  itemForm! : FormGroup;

  constructor(private fb : FormBuilder){}

  ngOnInit() {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      minPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      maxPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      avgPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      income: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  onSubmit(itemForm: FormGroup){
    console.log(itemForm.value);
    itemForm.reset();
  }
}
