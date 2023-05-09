import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { ModalService } from 'src/app/services/modal.service';
import { ShopService } from 'src/app/services/shop.service';
import {StorageService} from '../../utils/storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Shop } from 'src/app/models/shop.model';
import { AgentService } from 'src/app/services/agent.service';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Owner } from 'src/app/models/owner.model';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})

export class ShopsComponent implements OnInit {
  agents! : Agent[];
  // f!: FormGroup;
  role = '';
  closeResult = '';
  shops!: Shop;


  agentForm!: FormGroup;
  shopForm! : FormGroup;
  shopNo! : Shop[];
  availableShopNo! : Shop[];
  userName = '';
  password = '';
  user!:User;
  agentId!: number;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};


  constructor(
      private shopService : ShopService,
      private formBuilder: FormBuilder,
      public shopModal: NgbModal,
      public agentModal : NgbModal,
      private toaster: ToastrService,
      private storageService:StorageService,
      private authervice: AuthService,
      private agentService: AgentService,
      private tosterService: ToastrService,
      private router : Router,
      public loaderService:LoaderService){}


  open(content: any) {
    return this.shopModal.open(content, { centered: true });
  }

  ngOnInit(): void {
    //dataTable options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    //for getting roles
    this.storageService.role$.subscribe(data => {
      this.role =data;
    });
    this.role = this.storageService.getRole();

    //list Agent
    this.getAllAgent();

    // form builder

    this.shopForm = this.formBuilder.group({
      shopNo : ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
    });

    this.agentForm = this.formBuilder.group({
      userId: [null],
      shopNo: [null, Validators.required],
      agentName: [null, Validators.required],
      companyName: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]],
    });
    
    this.getAllShops();


  }

  filterShops(shop: Shop) {
    return shop['owner'] == null;
  }

  getAllAgent(){
    this.loaderService.show();
    this.shopService.getAllShops().subscribe((data: any) => {

      this.agents = data;
    });
    this.loaderService.hide();
  }


  getAllShops(){

    this.shopService.getAllShopNo().subscribe((data) => {
      this.shopNo = data;
      this.availableShopNo = this.shopNo.filter(this.filterShops);
    });
  }
  onSubmitShop(shopForm : FormGroup) {

    if(shopForm.valid){
      this.shopService.createShop(shopForm.value).subscribe(data=>{
        this.toaster.success('Shop added successfully');
      },(error)=>{

        this.toaster.error(error.error['message']);
      });
      this.getAllShops();
      shopForm.reset();
      this.shopModal.dismissAll();
    }
  }




  onSubmit(agentForm: FormGroup) {
    if (agentForm.valid) {

      this.addAgent(agentForm)
        .then(()=>{
          this.agentModal.dismissAll();
          this.agentForm.reset();
        })
        .catch((error)=>{
          this.tosterService.error(error.error['message']);
        });
    }
    this.getAllAgent();

  }

  addAgent(agentForm: FormGroup) {

    return new Promise((res, rej) => {
      agentForm.value.userId = this.agentId;

      const agent: Agent = new Agent(0,
        new User(this.agentId, '', '',agentForm.value['contact'],  ['admin']),
        agentForm.value['agentName'],
        agentForm.value['companyName'],
        agentForm.value['contact'],
        new Shop('', agentForm.value['shopNo'], new Owner(0)),
      );

      this.agentService.createAgent(agent).subscribe((data: any) => {
        res(data);
        this.tosterService.success('Agent added successfully!');

      }, (error: any) => {
        this.tosterService.error(error.error['message']);
        rej(error);
      });
    });
  }
}
