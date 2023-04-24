import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ShopService } from '../services/shop.service';
import { SignupComponent } from '../authorisation/signup/signup.component';
import { AuthService } from '../authorisation/service/auth.service';
import { filter } from 'rxjs';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent {


  agentForm!: FormGroup;
  shopNo: any;
  availableShopNo: any;
  userName: string = '';
  password: string = '';
  agentId: number | undefined;
  
  constructor(private fb: FormBuilder, private shopService: ShopService, private modalService: ModalService, private authervice: AuthService, private agentService: AgentService) {

  }

  onSubmit(agentForm: FormGroup) {
    if (agentForm.valid) {
      // username, password generation
      this.registerAgent(agentForm)
      .then(()=>this.addAgent(agentForm))
      .then(()=>{
        this.modalService.close();
        // window.location.reload();
        console.log(this.agentForm.value);
        console.log("form is submitted.")
        //at the very lat or the value will be lost 
        this.agentForm.reset();
       
      })
      .catch((error)=>{
        console.log(error);
        alert(error.error['message']);
      })
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
          console.log("added");
          alert("registered");

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

      let agentData = {
        "companyName": agentForm.value['companyName'],
        "contact": agentForm.value['contact'],
        "agentName": agentForm.value['agentName'],
        "user": {
          "id": this.agentId
        },
        "shop": {
          "shopId": agentForm.value['shopNo']
        }
      }
      this.agentService.createAgent(agentData).subscribe(data => {
        res(data);
        alert("Agent added");
      }, (error) => {
        console.log(error);
        // alert(error.error['message']);
        rej(error);
      });
    })
    return promise;
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

  filterShops(Shop: any) {
    if (Shop.owner == null)
      return true;
    else
      return false;
  }

  getShopId() {
  }
}
