import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ShopService } from '../services/shop.service';

import { Shop } from '../models/shop.model';



@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  agentForm!: FormGroup;
  // shops : String{}[] = ['A-12', 'B-13', 'A-16', 'A-26', 'B-05'];
  shops: Shop[] = [];
  userName : String= '';
  password : String = '';

  constructor(private fb: FormBuilder, private shopService: ShopService) {

  }

  onSubmit(agentForm : FormGroup) {

    if(agentForm.valid){
      // username, password generation
      for(let i=0; i<this.agents.length; i++){
        this.userName = this.agentForm.value.agents[i].agentName + (String)(Date.now()).slice(-4);
        this.password = this.userName;
        console.log("usernme : ", this.userName);
        console.log("password : ",this.password);
      }

      console.log(this.agentForm.value);
    }
  }

  ngOnInit() {
    this.agentForm = this.fb.group({
      agents: this.fb.array([
        this.createAgentFormGroup()
      ])
    });
    this.shopService.getAllShops().subscribe((data: Shop[]) => {
      this.shops = data;
    });

    console.log(this.shops);

  }

  createAgentFormGroup(): FormGroup {
    return this.fb.group({
      shops : ['', Validators.required],
      agentName: ['', Validators.required],
      companyName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('[0-9]{10}'), Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  get agents(): FormArray {
    return this.agentForm.get('agents') as FormArray;
  }

  addAgent() {
    this.agents.push(this.createAgentFormGroup());
  }

  removeAgent(index: number) {
    this.agents.removeAt(index);
  }

}