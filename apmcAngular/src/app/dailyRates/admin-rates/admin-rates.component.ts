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
  itemTypes : any;
  itemsList: any;
  forms! : FormGroup;
  ratesForm!: FormGroup;
  
  constructor(private itemService: ItemService, private fb: FormBuilder, public modalService: ModalService){}

    // list methods 
    // showContainer(typeId: number){
    //       this.itemService.getAllItems(typeId).subscribe((data: string[]) => {
    //       this.itemsList = data;
    //       this.forms = this.itemsList.map(item => this.createForm());
    //       })
    // }

    ngOnInit() {
    //   this.showContainer(1);
    }

    createForm() : FormGroup{
      return this.fb.group({
        item:[],  
        minPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        maxPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        avgPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        income: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      });
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
    // return;
    
    }

  //modal panel render methods 

    open(formName : string){
      this.modalService.open(formName);
      this.itemService.getItemTypes().subscribe((data)=>{
        this.itemTypes = data;
      }, (error)=>{
        console.log("Error");
        alert("Error loading ItemTypes");
      })
    }



    showContainer(a : number){

    }
}
