import {Agent} from '../models/agent.model';
import {AgentService} from '../services/agent.service';
import {AuthService} from '../authorisation/service/auth.service';
import {ModalService} from '../services/modal.service';
import {Owner} from '../models/owner.model';
import {Shop} from '../models/shop.model';
import {ShopService} from '../services/shop.service';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  
  constructor(private fb: FormBuilder, private shopService: ShopService, private modalService: ModalService, private authervice: AuthService, private agentService: AgentService) {

  }

  ngOnInit() {
    this.agentForm = this.fb.group({
      userId: [null],
      shopNo: [null, Validators.required],
      agentName: [null, Validators.required],
      companyName: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern('^[789]{1}[0-9]{9}$')]],
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
      this.registerAgent(agentForm)
        .then(()=>this.addAgent(agentForm))
        .then(()=>{
          this.modalService.close();
          // window.location.reload();
          this.agentForm.reset();
       
        })
        .catch((error)=>{
          alert(error.error['message']);
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
          alert('registered');

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
        new User(this.agentId, '', '',agentForm.value['contact'],   ['admin']),
        agentForm.value['agentName'],
        agentForm.value['companyName'],
        agentForm.value['contact'],
        new Shop('', agentForm.value['shopNo'], new Owner(0)),
      );

      this.agentService.createAgent(agent).subscribe(data => {
        res(data);
        console.log(agent);
        alert('Agent added');
      }, (error) => {
        alert(error.error['message']);
        rej(error);
      });
    });
  } 


}
