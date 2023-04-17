import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss']
})
export class UserRatesComponent implements OnInit{

  items: Item[] = [];

  constructor(private itemService : ItemService){

  }
  ngOnInit(){
      this.itemService.getAllItems().subscribe((data: Item[]) => {
        this.items = data;
      })
  }

}
