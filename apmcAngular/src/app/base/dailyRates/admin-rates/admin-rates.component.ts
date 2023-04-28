import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyRates } from 'src/app/models/dailyRates.model';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemType.model';
import { DailyRatesService } from 'src/app/services/daily-rates.service';
import { ItemService } from 'src/app/services/item.service';
import { ModalService } from 'src/app/services/modal.service';
import { DateFormatter } from 'src/app/utils/dateFormatter';

@Component({
  selector: 'app-admin-rates',
  templateUrl: './admin-rates.component.html',
  styleUrls: ['./admin-rates.component.scss']
})
export class AdminRatesComponent implements OnInit {

  itemTypes!: ItemType[];
  itemsList!: Item[];
  dailyRates!: FormGroup;
  rates: DailyRates[] = [];
  rateObj = new Map();
  date! : Date;
  day = '';

  constructor(
    private itemService: ItemService,
    private dailyRateService: DailyRatesService,
    private http: HttpClient,
    public modalService: ModalService,
    private dateFormatter: DateFormatter
    ) { }

  ngOnInit() {
    this.date = new Date();
    this.day = this.dateFormatter.dateinyyyymmdd(this.date);
    this.loadItemTypes()
      .then(() => this.loadItem(1))
      .then(() => this.loadDailyRates())
      .then(() => this.getRateObj())
      .then(() => this.initForm())
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  loadItemTypes() {

    const promise = new Promise((res, rej) => {
      this.itemService.getItemTypes().subscribe((data) => {
        this.itemTypes = data;
        res(this.itemTypes);
      }, (error) => {
        rej(error);
      });
    });
    return promise;
  }

  loadItem(n: number) {
    const promise = new Promise((res, rej) => {
      this.itemService.getAllItemsByTypeId(n).subscribe((data) => {
        this.itemsList = data;
        console.log(this.itemsList);
        res(this.itemsList);
      }, error => {
        rej(error);
      })
    })
    return promise;
  }

  loadDailyRates() {
    const promise = new Promise((res, rej) => {
      this.itemService.getAllItemsByDate(this.day).subscribe((data) => {
        this.rates = data;
        console.log(this.rates);
        res(this.rates);
      }, error => {
        alert("error loading daily rates");
        rej(error);
      });
    });
    return promise;
  }

  getRateObj() {
    let i = 0;
    const promise = new Promise((resolve, reject) => {
      this.rates.forEach(rate => {
        this.rateObj.set(rate['item']['itemId'], i);
        i += 1;
      });
      console.log(this.rateObj);
      resolve(this.rateObj);
    });
    return promise;
  }

  initForm() {
    this.dailyRates = new FormGroup({
      dailyRateArray: new FormArray([])
    });
    this.itemsList.forEach((item) => {
      let minPrice = null;
      let maxPrice = null;
      let avgPrice = null;
      let quantity = null;
      let income = null;
      if (this.rateObj.get(item['itemId']) != null) {
        minPrice = this.rates[this.rateObj.get(item['itemId'])]['minPrice'];
        maxPrice = this.rates[this.rateObj.get(item['itemId'])]['maxPrice'];
        avgPrice = this.rates[this.rateObj.get(item['itemId'])]['avgPrice'];
        quantity = this.rates[this.rateObj.get(item['itemId'])]['quantity'];
        income = quantity/2;
      }
      (<FormArray>this.dailyRates.get('dailyRateArray')).push(
        new FormGroup({
          itemId: new FormControl(item['itemId']),
          itemName: new FormControl({
            value: item['itemName'],
            disabled: true,
          }),

          minPrice: new FormControl(
            minPrice,
            [Validators.required, Validators.pattern('[0-9]+')]
          ),
          maxPrice: new FormControl(
            maxPrice,
            [Validators.required, Validators.pattern('[0-9]+')]
          ),
          // avgPrice: new FormControl(
          //   {value: avgPrice, disabled: true},
          //   [Validators.required, Validators.pattern('[0-9]+')]
          // ),
          quantity: new FormControl(
            quantity,
            [Validators.required, Validators.pattern('[0-9]+')]
          ),
          income: new FormControl(
            { value: income, disabled: true },
            [Validators.required, Validators.pattern('[0-9]+')]
          )
        })
      );
    });
  }

  get dailyRateControls() {
    return this.dailyRates.get('dailyRateArray') as FormArray;
  }

  mapperRateToItem(item: Item) {
    let itemId = item['itemId'];
    return this.rateObj.get(itemId);
  }

  onSubmit(i: number) {

    // console.log(this.dailyRates);
    
    const item:Item = {itemId :this.dailyRates.value['dailyRateArray'][i]['itemId'],itemName :this.dailyRates.value['dailyRateArray'][i]['itemName'],itemType: new ItemType(0, ""), dailyRates: []};

    const minPrice = this.dailyRates.value['dailyRateArray'][i]['minPrice'];
    const maxPrice = this.dailyRates.value['dailyRateArray'][i]['maxPrice']; 
    const quantity = this.dailyRates.value['dailyRateArray'][i]['quantity'];
    const income = this.dailyRates.value['dailyRateArray'][i]['income'];
    // let day = this.day;

    const avgPrice = (+minPrice + +maxPrice)/2;    

    const itemRates = new DailyRates(0, item, minPrice, maxPrice, avgPrice, quantity, income, this.day);
    console.log(itemRates);
    // console.log(this.dailyRates.value['dailyRateArray'][i]);

    this.dailyRateService.addDailyItemRate(itemRates, this.day).subscribe(data => {
      alert('Daily rates added successfully for ' + this.dailyRates.value['dailyRateArray'][i]['itemName'])
    }, error => {
      alert('SomeThing went wrong');
    });
    
    return;
  }

  open(formName: string) {
    this.modalService.open(formName);
  }

  showContainer(a: number) {
    this.loadItem(a)
      .then(() => this.initForm())
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
}