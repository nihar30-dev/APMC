import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop.model';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  shops: Shop[] = [];
  f!: FormGroup;
  showModal: boolean = false;

  onSubmit(f : FormGroup) {
    // console.log(f);
    // console.log(f.controls?.['shopNumber'].invalid);
    // console.log(f.get('shopNumber')?.invalid && f.get('shopNumber')?.dirty && f.get('shopNumber')?.touched);
    if(f.valid){
      console.log("form is submitted.")
    }
  }

 
  constructor(private shopService : ShopService, private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.shopService.getAllShops().subscribe((data: Shop[]) => {
      this.shops = data;
    });

    this.f = this.formBuilder.group({
      shopNumber : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    })
    console.log(this.shops);
  }

    onModalClose() {
      this.showModal = false;
    }

    onClickModel(){
      this.showModal = true;
      document.getElementById("modelButton")?.click();
    }

}

