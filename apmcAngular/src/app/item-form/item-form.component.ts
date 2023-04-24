import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  

  itemForm! : FormGroup;
  ItemTypes : any;

  constructor(private fb : FormBuilder, private itemService: ItemService){}

  ngOnInit() {
    this.itemService.getItemTypes().subscribe((data)=>{
      this.ItemTypes = data;
    }, (error)=>{
      alert("Error loading itemTypes");
    })
    this.itemForm = this.fb.group({
      itemTypeId : [null, Validators.required],
      itemName: [null, Validators.required]
    });
  }


  onSubmit(itemForm: FormGroup){
    if(itemForm.valid){
      
      let item = {
        "itemName": itemForm.value['itemName'],
        "itemType": {
          "itemTypeId": itemForm.value['itemTypeId']
        }
      }
      console.log(item);
      
      this.itemService.createItem(item).subscribe((data)=>{
        alert("Item added")
      })
      console.log(itemForm.value);
      itemForm.reset();
    }
  }
}
