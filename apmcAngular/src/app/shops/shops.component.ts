import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop.model';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  shops: Shop[] = [];
  shop = {
    shopNumber: '',
  };
  onSubmit(f: NgForm) {
    console.log(f);
    if (f.valid) {
      console.log('Shop number submitted: ' + this.shop.shopNumber);
    }
  }

  clearForm(f: NgForm) {
    f.reset();
  }

  constructor(private shopService : ShopService){

  }

  ngOnInit(): void {
    this.shopService.getAllShops().subscribe((data: Shop[]) => {
      this.shops = data;
    });
    console.log(this.shops);
  }
}

