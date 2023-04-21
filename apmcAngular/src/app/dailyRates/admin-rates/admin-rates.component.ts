import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin-rates',
  templateUrl: './admin-rates.component.html',
  styleUrls: ['./admin-rates.component.scss']
})
export class AdminRatesComponent implements OnInit{
  itemsList: string[] = [];
  ratesForm!: FormGroup;
  constructor(private itemService: ItemService, private fb: FormBuilder, public modalService: ModalService){}

    // list methods 
    showContainer(typeId: number){
          this.itemService.getAllItems(typeId).subscribe((data: string[]) => {
          this.itemsList = data;
          })
    }

    ngOnInit() {
      this.ratesForm = this.fb.group({
        minPrice: ['', [Validators.required, Validators.pattern('[0-9]')]],
        maxPrice: ['', [Validators.required, Validators.pattern('[0-9]')]],
        avgPrice: ['', [Validators.required, Validators.pattern('[0-9]')]],
        quantity: ['', [Validators.required, Validators.pattern('[0-9]')]],
        income: ['', [Validators.required, Validators.pattern('[0-9]')]],
      });

      this.showContainer(1);
    }

    onSubmit(ratesForm : FormGroup){
      console.log("form submitted");  
    }

  //modal panel render methods 

    open(formName : string){
      this.modalService.open(formName);
    }
}
