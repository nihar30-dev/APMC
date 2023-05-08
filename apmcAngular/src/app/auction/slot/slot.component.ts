import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { FormBuilder, FormControl, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { DateFormatter } from 'src/app/utils/dateFormatter';
import { CustomDateParserFormatter } from 'src/app/base/dailyRates/CustomDateParserFormatter';
import { ItemType } from 'src/app/models/itemType.model';
import { Item } from 'src/app/models/item.model';
import { ToastrService } from 'ngx-toastr';
import { Slot } from 'src/app/models/slot.model';
import { SlotService } from 'src/app/services/slot.service';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { ShopService } from 'src/app/services/shop.service';
import { SlotDetails } from 'src/app/models/slot-details.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/utils/storage.service';
import { Shop } from 'src/app/models/shop.model';
import { Owner } from 'src/app/models/owner.model';
import { SlotDetailsService } from 'src/app/services/slot-details.service';

@Component({
  selector: 'app-admin-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class SlotComponent implements OnInit{
  
  myForm !: FormGroup;
  bookSlot! : FormGroup;
  editSlot! : FormGroup;
  maxDate: NgbDate;
  minDate : NgbDate;
  datemodel : any;
  model2:any;
  day = '';
  date1 : Date| null = null;
  itemTypes!: ItemType[];
  itemsList!: Item[];
  allSlots!: Slot[];
  allAgents : Agent[] = [];
  active = 0;
  date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  selectedDate = '';
  protected readonly indexedDB = indexedDB;
  activateSearch!: boolean;
  dtOptions: DataTables.Settings = {};

  constructor(
    
    private ngbCalendar: NgbCalendar, 
    private dateAdapter: NgbDateAdapter<string>, 
    private dateFormatter: DateFormatter, 
    private fb: FormBuilder, 
    public slotModal: NgbModal,
    private bookModal : NgbModal,
    private editModal: NgbModal,
    private itemService : ItemService, 
    private slotService: SlotService,
    private calendar: NgbCalendar,
    private toaster:ToastrService,
    private shopService: ShopService,
    private storageService : StorageService,
    private slotDetailService:SlotDetailsService
  ) {
    this.minDate = this.calendar.getToday();
    this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 2);
  }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllAgents();
    this.active = 0;
    const date = new Date();
    this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    this.day = this.dateFormatter.dateinyyyymmdd(date);

    this.myForm = this.fb.group({
      quantity: ['', Validators.required],
      itemType: ['', Validators.required],
      item: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.loadItemTypes();
    this.getAllSlots();
  }

  loadItemTypes() {
      this.itemService.getItemTypes().subscribe((data) => {
        this.itemTypes = data;
      }, (error) => {
          this.toaster.error("Error loading Item Types");
      });
  }

  loadItem() {
    let n = +(<HTMLInputElement>document.getElementById('itemTypeId')).value;    
    this.itemsList = [];
      this.itemService.getAllItemsByTypeId(n).subscribe((data) => {
        this.itemsList = data;
      }, error => {
        this.toaster.error("Error loading Item");
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
      this.toaster.success("Slot added successfully!");

    }, (error: any) => {
      this.toaster.error(error.error['message']);
    });

  }
  
  onClick(id : number){
    this.itemService.getAllItemsByTypeId(id);
  }

  onDateSelect(dp: any) {
    this.date1 = new Date(`${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`);
    this.day = dp._inputValue.slice(6)+'-'+dp._inputValue.slice(3,5)+'-'+dp._inputValue.slice(0,2);
    // this.showContainer(0);
  }

  // showContainer(a: any) {
  //   console.log(a);
  //   this.allSlots = [];
  //   this.slotService.getAllSlots().subscribe((data)=>{
  //     this.allSlots = data;
  //     console.log(this.allSlots);
  //     if(this.allSlots.length == 0)
  //       this.toaster.info('No data found');
  //   }, () =>{
  //     this.toaster.error('No data found');
  //   });
  //   this.activateSearch = true;
  // }


  getAllSlots(){
    this.slotService.getAllSlots().subscribe((data) => {
      this.allSlots = data;
      this.toaster.success("Slot fetched successfully!");
    }, (error: any) => {
      this.toaster.error(error.error['message']);
    });
  }


  // Book Slot

  getAllAgents(){
    this.shopService.getAllShops().subscribe((data) => {
      this.allAgents = data;
      console.log(data);
      
    }, (error)=>{
      this.toaster.error("Error loading agents")
    });
  }

  openslotBook(content: any, i : number){
    // this.getAllAgents();
    this.initSlotBookForm(i);
    return this.bookModal.open(content, { centered: true });

  }

  initSlotBookForm(i:number){
    const slot = this.allSlots[i];
    console.log(slot);
    console.log();

    this.bookSlot = new FormGroup({
      slotId : new FormControl(slot['slotId']),
      itemType: new FormControl({value:slot['item']['itemType']['itemTypeName'], disabled:true}, Validators.required),
      item: new FormControl({value:slot['item']['itemName'], disabled:true}, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.max(slot['totalQuantity']), Validators.min(0)]),
      agent: new FormControl(null, Validators.required),
      date: new FormControl({value:slot['slotDate'], disabled:true}, Validators.required)
    });
  }

  bookSlotForm(bookSlot : FormGroup){
    
    const user = new User(this.storageService.getUserId(), "", "", "", []);
    const item : Item = {itemId : 0, itemName: "", itemType: new ItemType(0,""), dailyRates: []};
    const slot : Slot = {slotId: bookSlot.controls['slotId'].value, item: item, totalQuantity:0, bookedQuantity: 0, slotDate: ""};
    const agent = new Agent(bookSlot.value['agent'], user, "", "", "", new Shop("", 0, new Owner(0)));
    const slotDetail : SlotDetails = {slotDetailId:0, user: user, slot: slot, agent:agent, quantity:bookSlot.value['quantity'] }
    console.log(slotDetail);

    this.slotDetailService.bookSlot(slotDetail).subscribe((data)=>{
      this.toaster.success("Slot Booked Successfully");
    }, (error)=>{
      this.toaster.error("Something went wrong");
    })
    
    this.bookModal.dismissAll();
  }


  // EDIT SLOT

  openslotEdit(content: any, i : number){
    // this.getAllAgents();
    this.initEditSlot(i);
    return this.editModal.open(content, { centered: true });

  }


  initEditSlot(i:number){
    
    this.editSlot = this.fb.group({
      quantity: ['', Validators.required],
      itemType: ['', Validators.required],
      item: ['', Validators.required],
      date: ['', Validators.required]
    });

    const slot = this.allSlots[i];

    this.editSlot = new FormGroup({
      slotId : new FormControl(slot['slotId']),
      itemType: new FormControl({value:slot['item']['itemType']['itemTypeName'], disabled:true}, Validators.required),
      item: new FormControl({value:slot['item']['itemName'], disabled:true}, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(slot['bookedQuantity'])]),
      date: new FormControl("", Validators.required)
    });

  }

  submitEditSlot(editSlot : FormGroup){

    console.log(editSlot);
    let date = editSlot.value['date'];
    let month = date.month+'';
    let day = date.day+'';
    let year = date.year+'';
    let formattedDay = year+'-'+month.padStart(2,'0')+'-'+day.padStart(2,'0');
    
    editSlot.value['date']=formattedDay;
    console.log(editSlot);

    if(editSlot.value['quantity']<0){
      
    }
    
    if(editSlot.valid){
      const items : Item = {itemId : editSlot.value['item'], itemName: "", itemType: new ItemType(0, ''), dailyRates : []};
      const slot : Slot = {
        slotId: editSlot.value['slotId'],
        item: items,
        totalQuantity: editSlot.value['quantity'],
        bookedQuantity: 0,
        slotDate : editSlot.value['date']
      }
  
      this.slotService.addSlot(slot).subscribe((data: any) => {
        this.toaster.success("Slot updated successfully!");
  
      }, (error: any) => {
        this.toaster.error(error.error['message']);
      });
    }else{
      this.toaster.error("Could not edit the Slot");
    }
    this.editModal.dismissAll();
  }

  deleteSlot(i: number){
    const slot = this.allSlots[i];
    console.log(slot);
    
    if(slot['bookedQuantity']==0){
      this.slotService.deleteSlot(slot['slotId']).subscribe((data)=>{
        this.toaster.success("Slot deleted successfully");
      },(error)=>{
        this.toaster.error("Something went wrong");
        console.log(error);
      })
    }
    else{
      this.toaster.error("Could not delete Slot!");
    }
  }


}