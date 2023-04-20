import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop.model';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  shops: Shop[] = [];
  f!: FormGroup;

  constructor(
    private shopService : ShopService,
    private formBuilder: FormBuilder, 
    public modalService: ModalService){}

  ngOnInit(): void {

    //list population 
    this.shopService.getAllShops().subscribe((data: Shop[]) => {
      this.shops = data;
    });
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
      console.log("form is submitted.")
    }
  }

  //modal panel render methods 

  open(formName : string){
    this.modalService.open(formName);
  }
 
}

