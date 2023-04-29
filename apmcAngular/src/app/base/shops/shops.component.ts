import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { ModalService } from 'src/app/services/modal.service';
import { ShopService } from 'src/app/services/shop.service';
import {StorageService} from "../../utils/storage.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  agents! : Agent[];
  f!: FormGroup;
  role = '';

  constructor(
    private shopService : ShopService,
    private formBuilder: FormBuilder, 
    public modalService: ModalService,
    private storageService:StorageService){}

  ngOnInit(): void {
    //list population 
    this.shopService.getAllShops().subscribe((data: any) => {
      // this.shops = data; 

      //for getting roles
      this.storageService.role$.subscribe(data => {
        this.role =data;
      });
      this.role = this.storageService.getRole();

      this.agents = data;
      console.log(data);
    });
    // form builder
    this.f = this.formBuilder.group({
      shopNumber : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    });
  }


  onSubmit(f : FormGroup) {
    if(f.valid){
      this.shopService.createShop(f.value);
    }
  }

  //modal panel render methods 

  open(formName : string){
    return  this.modalService.open(formName);

  } 
}

