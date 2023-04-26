import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemType.model';
import { ItemService } from 'src/app/services/item.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin-rates',
  templateUrl: './admin-rates.component.html',
  styleUrls: ['./admin-rates.component.scss']
})
export class AdminRatesComponent implements OnInit{

  itemTypes! : ItemType[];
  itemsList!: Item[];
  dailyRates! : FormGroup;
  // dailyRateControls: any;

  constructor(private itemService: ItemService,  public modalService: ModalService){}

  ngOnInit() {
    this.itemService.getItemTypes().subscribe((data)=>{
      this.itemTypes = data;
    }, ()=>{

      alert('Error loading ItemTypes');
    });
    this.itemService.getAllItemsByTypeId(1).subscribe(data=>{
      this.itemsList = data;


    });

    setTimeout(()=>{
      this.initForm();
    },100);
  }

  initForm(){

    this.dailyRates = new FormGroup({
      dailyRateArray : new FormArray([])
    });
    this.itemsList.forEach((item) => {
      (<FormArray>this.dailyRates.get('dailyRateArray')).push(
        new FormGroup({
          itemId : new FormControl(item['itemId']),
          itemName: new FormControl({
            value: item['itemName'],
            disabled: true,
          }),
          minPrice: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
          maxPrice: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
          avgPrice: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
          quantity: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
          income: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')])
        })
      );
    });
  }

  get dailyRateControls () {      
    return this.dailyRates.get('dailyRateArray') as FormArray;
  }



  onSubmit(i : number){
    //   const value = this.forms[i].value;
    //   value.item = this.itemsList[i];
    //   const form = this.forms[i];

    // if (form.valid) {
    //   const formData = form.value;
    //   this.itemService.submitItem(formData).subscribe(response => {
    //     console.log('Form submitted successfully:');
    //     console.log(this.itemsList[0]);
    //     console.log(formData);
    //   });
    // }


    return;

  }

  //modal panel render methods 

  open(formName : string){
    this.modalService.open(formName);
  }

  // showContainer(a : number){
  // }


}
