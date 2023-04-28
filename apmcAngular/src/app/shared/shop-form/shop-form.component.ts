import { Shop } from 'src/app/models/shop.model';
import { ModalService } from 'src/app/services/modal.service';
import { ShopService } from 'src/app/services/shop.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {

  shops!: Shop;
  f!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private modalService:ModalService, private shopService : ShopService){}

  ngOnInit(): void {

    this.f = this.formBuilder.group({
      shopNo : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    });
  }


  onSubmit(shopForm : FormGroup) {
    
    Shop;

    if(shopForm.valid){
      this.shopService.createShop(shopForm.value).subscribe(data=>{
        alert('shop added'+data);
      },(error)=>{
        alert(error.error['message']);
      });
      this.modalService.close();
    }
  }
 
}
