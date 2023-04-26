import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../authorisation/service/auth.service';
import { AgentService } from '../services/agent.service';
import { Shop } from '../models/shop.model';
import { Agent } from '../models/agent.model';
import { User } from '../models/user.model';
import { Owner } from '../models/owner.model';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent {


  agentForm!: FormGroup;
  shopNo! : Shop[];
  availableShopNo! : Shop[];
  userName: string = '';
  password: string = '';
  agentId!: number;
  
  constructor(private fb: FormBuilder, private shopService: ShopService, private modalService: ModalService, private authervice: AuthService, private agentService: AgentService) {

  }

  ngOnInit() {
    this.agentForm = this.fb.group({
      userId: [null],
      shopNo: [null, Validators.required],
      agentName: [null, Validators.required],
      companyName: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern('[0-9]{10}'), Validators.maxLength(10), Validators.minLength(10)]],
    });
    this.shopService.getAllShopNo().subscribe((data) => {
      this.shopNo = data;
      this.availableShopNo = this.shopNo.filter(this.filterShops);
    });
  }

  filterShops(shop: Shop) {
    if (shop['owner'] == null)
      return true;
    else
      return false;
  }



  onSubmit(agentForm: FormGroup) {
    if (agentForm.valid) {
      // username, password generation
      this.registerAgent(agentForm)
      .then(()=>this.addAgent(agentForm))
      .then(()=>{
        this.modalService.close();
        // window.location.reload();
        this.agentForm.reset();
       
        })
        .catch((error)=>{
          console.log(error);
          alert(error.error['message']);
        });
    }
    this.getShopId();
  }


  registerAgent(agentForm: FormGroup) {
    const promise = new Promise((res, rej) => {

      this.userName = this.agentForm.value.agentName + (String)(Date.now()).slice(-4);
      this.password = this.userName;

      this.authervice.register(this.userName, this.password, agentForm.value.contact).subscribe(
        data => {
          this.agentId = data;
          res(data);
          console.log('added');
          alert('registered');

        }, error => {
          console.log(error);
          rej(error);
        }
      );
    });
    return promise;
  }

  addAgent(agentForm: FormGroup) {

    const promise = new Promise((res, rej) => {
      agentForm.value.userId = this.agentId;

      let agent : Agent = new Agent(
        new User(this.agentId, "", ""), 
        agentForm.value['agentName'], 
        agentForm.value['companyName'], 
        agentForm.value['contact'], 
        new Shop("", agentForm.value['shopNo'], new Owner(0) )
      );

      this.agentService.createAgent(agent).subscribe(data => {
        res(data);
        alert('Agent added');
      }, (error) => {
        alert(error.error['message']);
        rej(error);
      });
    });
    return promise;
  } 

  getShopId() {
  }
}
