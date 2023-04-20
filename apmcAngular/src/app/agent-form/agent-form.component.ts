import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop.model';
import { ModalService } from '../services/modal.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent {
  agentForm!: FormGroup;
  // shops : String{}[] = ['A-12', 'B-13', 'A-16', 'A-26', 'B-05'];
  shops: Shop[] = [];
  userName : String= '';
  password : String = '';

  constructor(private fb: FormBuilder, private shopService: ShopService, private modalService: ModalService) {

  }

  onSubmit(agentForm : FormGroup) {
    if(agentForm.valid){
      // username, password generation
        this.userName = this.agentForm.value.agentName + (String)(Date.now()).slice(-4);
        this.password = this.userName;
        console.log("usernme : ", this.userName);
        console.log("password : ",this.password);
      this.modalService.close();
      console.log(this.agentForm.value);


      //at the very lat or the value will be lost 
      this.agentForm.reset();
    }
  }

  ngOnInit() {
    this.agentForm = this.fb.group({
      shops : ['', Validators.required],
      agentName: ['', Validators.required],
      companyName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('[0-9]{10}'), Validators.maxLength(10), Validators.minLength(10)]],
    });
    this.shopService.getAllShops().subscribe((data: Shop[]) => {
      this.shops = data;
    });

    console.log(this.shops);
  }
}
