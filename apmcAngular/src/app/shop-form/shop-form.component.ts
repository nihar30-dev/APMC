import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Shop } from '../models/shop.model';
import { ModalService } from '../services/modal.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {
  shops: Shop[] = [];
  f!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private modalService:ModalService, private shopService : ShopService){}

  ngOnInit(): void {
    // form builder
    this.f = this.formBuilder.group({
      shopNumber : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    })
    console.log(this.shops);
  }


  onSubmit(f : FormGroup) {
    // console.log(f);
    // console.log(f.controls?.['shopNumber'].invalid);
    // console.log(f.get('shopNumber')?.invalid && f.get('shopNumber')?.dirty && f.get('shopNumber')?.touched);
    if(f.valid){
      console.log(f.value)
      this.shopService.createShop(f.value);
      // this.shopService.getAllShops().subscribe(data => console.log(data));
      this.modalService.close();
      console.log("form is submitted.")
    }
  }
 
}