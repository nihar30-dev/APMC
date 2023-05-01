import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DailyRates } from 'src/app/models/dailyRates.model';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemType.model';
import { DailyRatesService } from 'src/app/services/daily-rates.service';
import { ItemService } from 'src/app/services/item.service';
// import { ModalService } from 'src/app/services/modal.service';
import { DateFormatter } from 'src/app/utils/dateFormatter';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-rates',
  templateUrl: './admin-rates.component.html',
  styleUrls: ['./admin-rates.component.scss']
})
export class AdminRatesComponent {

  dataFetched : boolean = false;
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
  

  constructor(
    private itemService: ItemService,
    private dailyRateService: DailyRatesService,
    private http: HttpClient,
    private dateFormatter: DateFormatter,
    private toster:ToastrService,
    private calendar : NgbCalendar,
    private modal: NgbModal,
    private fb : FormBuilder,
    private tosterService: ToastrService ) { 
      this.maxDate = calendar.getToday();

    }
    itemForm! : FormGroup;
    ItemTypes! : ItemType[];
     
  ngOnInit() {
    this.itemService.getItemTypes().subscribe((data)=>{
      this.ItemTypes = data;
    }, ()=>{
      this.tosterService.error("Error loading ItemTypes");
    });
    this.itemForm = this.fb.group({
      itemTypeId : [null, Validators.required],
      itemName: [null, Validators.required]
    });
    let date = new Date();
    this.day = this.dateFormatter.dateinyyyymmdd(date);
    this.loadItemTypes()
      .then(() => this.loadItem(1))
      .then(() => this.loadDailyRates())
      .then(() => this.getRateObj())
      .then(() => this.initForm())
      .catch((error) => {
        this.toster.error("Something went wrong")
      });
  }


  onSubmit(itemForm: FormGroup){
    if(itemForm.valid){
      
      const item : Item = {itemId:0, itemName: itemForm.value['itemName'],itemType: new ItemType(itemForm.value['itemTypeId'], ''), dailyRates : []};  
      this.itemService.createItem(item).subscribe(()=>{
        this.tosterService.success("Item added successfully");
      });
      itemForm.reset();
      this.modal.dismissAll();
    }

  }


    openModal(content : any) {
      this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', centered : true } )
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
        this.toster.error("Error loading Rates")
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
    this.dataFetched = true;
  }

  get dailyRateControls() {
    return this.dailyRates.get('dailyRateArray') as FormArray;
  }

    //datepicker methods
    onDateSelect(dp: NgbInputDatepicker) {
      this.date1 = new Date(`${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`);
      this.day = this.dateFormatter.dateinyyyymmdd(this.date1);

      setTimeout(() => {
        dp.close();
      }, 100);
      console.log(this.date1);
      console.log(this.day);
      this.itemsList = [];
      this.rates = [];
      this.rateObj.clear();
      this.dataFetched = false;
      this.loadDailyRates()
      .then(() => this.getRateObj())
      .then(() => this.initForm())
      
      this.showContainer(1);
    }

  mapperRateToItem(item: Item) {
    let itemId = item['itemId'];
    return this.rateObj.get(itemId);
  }

  onFormSubmit(i: number) {

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
      this.toster.success("Rate added successfully")
    }, error => {
      this.toster.error("SOmething went wrong")
    });
    
    return;
  }

  open(formName: string) {
    this.modal.open(formName);
  }

  showContainer(a: any) {
    this.loadItem(a.index+1)
      .then(() => this.initForm())
      .catch((error) => {
        console.log(error);
        this.toster.error("Something went wrong")
      });
  }
}
