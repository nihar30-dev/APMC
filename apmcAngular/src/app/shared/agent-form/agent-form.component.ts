
import { AuthService } from 'src/app/authentication/service/auth.service';
import { Agent } from 'src/app/models/agent.model';
import { Owner } from 'src/app/models/owner.model';
import { Shop } from 'src/app/models/shop.model';
import { User } from 'src/app/models/user.model';
import { AgentService } from 'src/app/services/agent.service';
import { ModalService } from 'src/app/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit{

  agentForm!: FormGroup;
  shopNo! : Shop[];
  availableShopNo! : Shop[];
  userName = '';
  password = '';
  user!:User;
  agentId!: number;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private modalService: ModalService,
    private authervice: AuthService, 
    private agentService: AgentService,
    private tosterService: ToastrService,
    private router : Router
  ) {

  }

  ngOnInit() {
    this.agentForm = this.fb.group({
      userId: [null],
      shopNo: [null, Validators.required],
      agentName: [null, Validators.required],
      companyName: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]],
    });
    this.shopService.getAllShopNo().subscribe((data) => {
      this.shopNo = data;
      this.availableShopNo = this.shopNo.filter(this.filterShops);
    });
  }

  filterShops(shop: Shop) {
    return shop['owner'] == null;
  }



  onSubmit(agentForm: FormGroup) {
    if (agentForm.valid) {
      // username, password generation
      // this.registerAgent(agentForm)
      this.addAgent(agentForm)
        .then(()=>{
          this.modalService.close();
          this.router.navigate(['shops']);
          this.agentForm.reset();
        })
        .catch((error)=>{
          this.tosterService.error(error.error['message']);
        });
    }

  }


  registerAgent(agentForm: FormGroup) {
    return new Promise((res, rej) => {

      this.userName = this.agentForm.value.agentName + (String)(Date.now()).slice(-4);
      this.password = this.userName;
      const user = new User(0,this.userName,this.password,agentForm.value.contact,['agent']);
      this.authervice.register(user).subscribe(
        data => {
          this.agentId = data;
          res(data);
          this.tosterService.success('Registered successully!');
        }, error => {
          rej(error);
        }
      );
    });
  }

  addAgent(agentForm: FormGroup) {

    return new Promise((res, rej) => {
      agentForm.value.userId = this.agentId;

      const agent: Agent = new Agent(
        new User(this.agentId, '', '',agentForm.value['contact'],['admin']),
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
