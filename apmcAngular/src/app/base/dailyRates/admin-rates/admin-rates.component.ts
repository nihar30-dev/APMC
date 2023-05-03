import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbInputDatepicker, NgbNavChangeEvent
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DailyRates } from 'src/app/models/dailyRates.model';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemType.model';
import { DailyRatesService } from 'src/app/services/daily-rates.service';
import { ItemService } from 'src/app/services/item.service';
import { DateFormatter } from 'src/app/utils/dateFormatter';
import {CustomDateParserFormatter} from '../CustomDateParserFormatter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-rates',
  templateUrl: './admin-rates.component.html',
  styleUrls: ['./admin-rates.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class AdminRatesComponent implements OnInit{

  dataFetched  = false;
  itemTypes!: ItemType[];
  itemsList!: Item[];
  dailyRates!: FormGroup;
  rates: DailyRates[] = [];
  rateObj = new Map();
  day = '';
  date: NgbDateStruct | null = null;
  date1 : Date| null = null;
  selectedDate = '';
  maxDate: NgbDate;
  model2:any;
  active =0;
  

  constructor(
    private itemService: ItemService,
    private dailyRateService: DailyRatesService,
    private dateFormatter: DateFormatter,
    private toster:ToastrService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private modal: NgbModal,
    private fb : FormBuilder,
    private tosterService: ToastrService ) { 
    this.maxDate = ngbCalendar.getToday();

  }
  itemForm! : FormGroup;
  ItemTypes! : ItemType[];
     
  ngOnInit() {
    // this.active = 'ngb-nav-0';
    console.log('Oninit : ',this.active);
    this.itemService.getItemTypes().subscribe((data)=>{
      this.ItemTypes = data;
    }, ()=>{
      this.tosterService.error('Error loading ItemTypes');
    });
    this.itemForm = this.fb.group({
      itemTypeId : [null, Validators.required],
      itemName: [null, Validators.required]
    });
    const date = new Date();
    this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    this.day = this.dateFormatter.dateinyyyymmdd(date);
    this.loadItemTypes()
      .then(() => this.loadItem(1))
      .then(() => this.loadDailyRates())
      .then(() => this.getRateObj())
      .then(() => this.initForm())
      .catch((error) => {
        this.toster.error('Something went wrong');
      });
  }

  onNavChange(e:NgbNavChangeEvent){
    console.log(e);
    e.nextId='ngb-nav-0';
  }





  onSubmit(itemForm: FormGroup){
    if(itemForm.valid){
      
      const item : Item = {itemId:0, itemName: itemForm.value['itemName'],itemType: new ItemType(itemForm.value['itemTypeId'], ''), dailyRates : []};  
      this.itemService.createItem(item).subscribe(()=>{
        this.tosterService.success('Item added successfully');
      });
      itemForm.reset();
      this.modal.dismissAll();
    }

  }



  openModal(content : any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', centered : true } );
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
      });
    });
    return promise;
  }

  loadDailyRates() {
    const promise = new Promise((res, rej) => {
      this.itemService.getAllItemsByDate(this.day).subscribe((data) => {
        this.rates = data;
        console.log(this.rates);
        res(this.rates);
      }, error => {
        this.toster.error('Error loading Rates');
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
      let quantity = null;
      let income = null;


      if (this.rateObj.get(item['itemId']) != null) {
        minPrice = this.rates[this.rateObj.get(item['itemId'])]['minPrice'];
        maxPrice = this.rates[this.rateObj.get(item['itemId'])]['maxPrice'];
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
    this.dataFetched = true;
  }

  get dailyRateControls() {
    return this.dailyRates.get('dailyRateArray') as FormArray;
  }

  //datepicker methods
  onDateSelect(dp: any) {
    this.date1 = new Date(`${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`);
    // this.day = this.dateFormatter.dateinyyyymmdd(this.date1);
    // this.day = this.dateFormatter.dateinyyyymmdd(dp);
    this.day = dp._inputValue.slice(6)+'-'+dp._inputValue.slice(3,5)+'-'+dp._inputValue.slice(0,2);
    this.itemsList = [];
    this.rates = [];
    this.rateObj.clear();
    this.dataFetched = false;
    this.loadDailyRates()
      .then(() => this.getRateObj())
      .then(() => this.initForm());
      
    this.showContainer(0);
  }

  mapperRateToItem(item: Item) {
    const itemId = item['itemId'];
    return this.rateObj.get(itemId);
  }

  onFormSubmit(i: number) {

    // console.log(this.dailyRates);
    
    const item:Item = {itemId :this.dailyRates.value['dailyRateArray'][i]['itemId'],itemName :this.dailyRates.value['dailyRateArray'][i]['itemName'],itemType: new ItemType(0, ''), dailyRates: []};

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
      this.toster.success('Rate added successfully');
    }, error => {
      this.toster.error('Something went wrong');
    });
    
    return;
  }

  open(formName: string) {
    this.modal.open(formName);
  }

  showContainer(a: any) {
    this.loadItem(a+1)
      .then(() => this.initForm())
      .catch((error) => {
        console.log(error);
        this.toster.error('Something went wrong');
      });
  }
}
