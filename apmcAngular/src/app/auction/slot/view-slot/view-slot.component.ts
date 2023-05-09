import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserAgent } from 'src/app/models/dto/agent-user.model';
import { Slot } from 'src/app/models/slot.model';
import { ItemService } from 'src/app/services/item.service';
import { SlotDetailsService } from 'src/app/services/slot-details.service';
import { SlotService } from 'src/app/services/slot.service';
import { StorageService } from 'src/app/utils/storage.service';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.scss']
})
export class ViewSlotComponent implements OnInit{

   role!:string;
   allSlots!:UserAgent[];
   dtOptions: DataTables.Settings = {};



  constructor( private itemService : ItemService, 
    private slotService: SlotService , private storageService:StorageService , private toasterService:ToastrService,
    private slotDetailsService:SlotDetailsService)
    {}

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.loadSlotDetailsforAgent();
  }

 loadSlotDetailsforAgent(){
  console.log(this.storageService.getUserId());
  this.slotDetailsService.getSlotDetailByAgentId(this.storageService.getUserId()).subscribe((data) => {
    this.allSlots = data;
    console.log(this.allSlots);
    console.log(this.allSlots[0].user.userDetail.fullName);
    
  })
 }




}
