import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopService } from '../services/shop.service';
// import { Shop } from '../models/agent.model';
import { ModalService } from '../services/modal.service';
import { Agent } from '../models/agent.model';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  shops : any;
  agents! : Agent[];
  f!: FormGroup;

  constructor(
    private shopService : ShopService,
    private formBuilder: FormBuilder, 
    public modalService: ModalService){}

  ngOnInit(): void {
    //list population 
    this.shopService.getAllShops().subscribe((data) => {
      // this.shops = data; 
      
      this.agents = data;
    });
    // form builder
    this.f = this.formBuilder.group({
      shopNumber : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    });
  }


  onSubmit(f : FormGroup) {
    if(f.valid){
      this.shopService.createShop(f.value);
      console.log('form is submitted.');
    }
  }

  //modal panel render methods 

  open(formName : string){
    const mref = this.modalService.open(formName);
    // mref.afterClosed().subscribe(()=>{
        
    // })
  } 
}

