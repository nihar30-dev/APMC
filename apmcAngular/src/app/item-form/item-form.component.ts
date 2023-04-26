import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ItemType } from '../models/itemType.model';
import { Item } from '../models/item.model';
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  

  itemForm! : FormGroup;
  ItemTypes! : ItemType[];

  constructor(private fb : FormBuilder, private itemService: ItemService, private modalService: ModalService){}

  ngOnInit() {
    this.itemService.getItemTypes().subscribe((data)=>{
      this.ItemTypes = data;
    }, ()=>{
      alert('Error loading itemTypes');
    });
    this.itemForm = this.fb.group({
      itemTypeId : [null, Validators.required],
      itemName: [null, Validators.required]
    });
  }


  onSubmit(itemForm: FormGroup){
    if(itemForm.valid){
      
      const item : Item = new Item(0, itemForm.value['itemName'], new ItemType(itemForm.value['itemTypeId'], ''));  
      this.itemService.createItem(item).subscribe(()=>{
        alert('Item added');
      });
      itemForm.reset();
      this.modalService.close();
    }

  }
}
