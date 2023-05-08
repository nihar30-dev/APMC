import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemType.model';
import { ItemService } from 'src/app/services/item.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  

  itemForm! : FormGroup;
  ItemTypes! : ItemType[];

  constructor(private fb : FormBuilder, private itemService: ItemService, private modalService: ModalService, private tosterService: ToastrService){}

  ngOnInit() {
    this.itemService.getItemTypes().subscribe((data)=>{
      this.ItemTypes = data;
    }, ()=>{
      this.tosterService.error("Error loading ItemTypes");
    });
    this.itemForm = this.fb.group({
      itemTypeId : [null, Validators.required],
      itemName: [null, Validators.required]
    });
  }


  onSubmit(itemForm: FormGroup){
    if(itemForm.valid){
      
      const item : Item = {itemId:0, itemName: itemForm.value['itemName'],itemType: new ItemType(itemForm.value['itemTypeId'], ''), dailyRates : []};  
      this.itemService.createItem(item).subscribe(()=>{
        this.tosterService.success("Item added successfully");
      });
      itemForm.reset();
      this.modalService.close();
    }

  }
}
