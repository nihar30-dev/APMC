import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { DateFormatter } from 'src/app/utils/dateFormatter';
import { CustomDateParserFormatter } from 'src/app/base/dailyRates/CustomDateParserFormatter';
import { ItemType } from 'src/app/models/itemType.model';
import { Item } from 'src/app/models/item.model';
import { ToastrService } from 'ngx-toastr';
import { Slot } from 'src/app/models/slot.model';
import { SlotService } from 'src/app/services/slot.service';
import { StorageService } from 'src/app/utils/storage.service';
import { UserDetail } from 'src/app/models/user-detail.model';
import { userDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-admin-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class SlotComponent implements OnInit{
  
  myForm !: FormGroup;
  maxDate: NgbDate;
  minDate : NgbDate;
  datemodel : any;
  model2:any;
  day = '';
  role = '';
  date1 : Date| null = null;
  itemTypes!: ItemType[];
  itemsList!: Item[];
  allSlots: Slot[] = [];
  active = 0;
  date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  selectedDate = '';
  protected readonly indexedDB = indexedDB;
  activateSearch!: boolean;

  userDetailForm!: FormGroup;
  districts: String[] = ['xyz'];
  talukas: String[] = ['xyz'];

  constructor(
    
    private ngbCalendar: NgbCalendar, 
    private dateAdapter: NgbDateAdapter<string>, 
    private dateFormatter: DateFormatter, 
    private fb: FormBuilder, 
    public  slotModal: NgbModal, 
    private itemService : ItemService, 
    private slotService: SlotService,
    private calendar: NgbCalendar,
    private toasterService: ToastrService,
    private storageService: StorageService,
    private modal: NgbModal,
    private userDetailService: userDetailService
  ) {
    this.minDate = this.calendar.getToday();
    this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 2);
  }


  ngOnInit(): void {
    this.active = 0;
    const date = new Date();
    this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    this.day = this.dateFormatter.dateinyyyymmdd(date);


    this.storageService.role$.subscribe(data => {
      this.role =data;
    });
    this.role = this.storageService.getRole();

    this.myForm = this.fb.group({
      quantity: ['', Validators.required],
      itemType: ['', Validators.required],
      item: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.userDetailForm = this.fb.group({
      fullName: [null, Validators.required],
      district: [null, Validators.required],
      taluka: [null, Validators.required],
      village: [null, Validators.required],
      crops: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+(,[a-zA-Z]+)*$')]]
    });

    this.loadItemTypes();
  }

  loadItemTypes() {
      this.itemService.getItemTypes().subscribe((data) => {
        this.itemTypes = data;
      }, (error) => {
          this.toasterService.error("Error loading Item Types");
      });
  }

  loadItem() {
    let n = +(<HTMLInputElement>document.getElementById('itemTypeId')).value;    
    this.itemsList = [];
      this.itemService.getAllItemsByTypeId(n).subscribe((data) => {
        this.itemsList = data;
      }, error => {
        this.toasterService.error("Error loading Item");
      });
  }

  open(content: any) {
    return this.slotModal.open(content, { centered: true });
  }

  onSubmitSlot(myForm : FormGroup) {
    let date = myForm.value['date'];
    let month = date.month+'';
    let day = date.day+'';
    let year = date.year+'';
    let formattedDay = year+'-'+month.padStart(2,'0')+'-'+day.padStart(2,'0');
    
    myForm.value['date']=formattedDay;
    
    if(myForm.valid){
      this.addSlot(myForm);
      this.slotModal.dismissAll();
    }
  }

  addSlot(myForm : FormGroup){

    const items : Item = {itemId : myForm.value['item'], itemName: "", itemType: new ItemType(0, ''), dailyRates : []};
    const slot : Slot = {
      slotId: 0,
      item: items,
      totalQuantity: myForm.value['quantity'],
      bookedQuantity: 0,
      slotDate : myForm.value['date']
    }

    this.slotService.addSlot(slot).subscribe((data: any) => {
      this.toasterService.success("Slot added successfully!");

    }, (error: any) => {
      this.toasterService.error(error.error['message']);
    });

  }
  
  onClick(id : number){
    this.itemService.getAllItemsByTypeId(id);
  }

  onDateSelect(dp: any) {
    this.date1 = new Date(`${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`);
    this.day = dp._inputValue.slice(6)+'-'+dp._inputValue.slice(3,5)+'-'+dp._inputValue.slice(0,2);
    this.showContainer(0);
  }

  showContainer(a: any) {
    console.log(a);
    this.allSlots = [];
    this.slotService.getSlotByItemType(1).subscribe((data)=>{
      this.allSlots = data;
      console.log(this.allSlots);
      if(this.allSlots.length == 0)
        this.toasterService.info('No data found');
    }, () =>{
      this.toasterService.error('No data found');
    });
    this.activateSearch = true;
  }


  getAllSlots(){
    this.slotService.getAllSlots().subscribe((data) => {
      this.allSlots = data;
      this.toasterService.success("Slot fetched successfully!");
    }, (error: any) => {
      this.toasterService.error(error.error['message']);
    });
  }

  onSubmitDetails(userDetailForm: FormGroup){
    if(userDetailForm.valid){
      const userDetail : UserDetail = new UserDetail({id: this.storageService.getUser().id}, userDetailForm.value['fullName'], userDetailForm.value['district'], userDetailForm.value['taluka'], userDetailForm.value['village'], userDetailForm.value['crops']);  
      this.userDetailService.addUserDetail(userDetail).subscribe(()=>{
        this.toasterService.success('Details added successfully');
      });
      this.userDetailForm.reset();
      this.modal.dismissAll();
    }

  }

  openModal(content : any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', centered : true } );
  }
}