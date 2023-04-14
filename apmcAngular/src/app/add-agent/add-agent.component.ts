import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmptyError } from 'rxjs';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  agentForm!: FormGroup;
  shops : String[] = ['A-12', 'B-13', 'A-16', 'A-26', 'B-05'];
  userName : String= '';
  password : String = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.agentForm = this.fb.group({
      agents: this.fb.array([
        this.createAgentFormGroup()
      ])
    });
  }

  createAgentFormGroup(): FormGroup {
    return this.fb.group({
      shops : ['', Validators.required],
      agentName: ['', Validators.required],
      companyName: ['', Validators.required],
      contact: ['', Validators.required],
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

  onSubmit() {

    for(let i=0; i<this.agents.length; i++){
      this.userName = this.agentForm.value.agents[i].agentName + (String)(Date.now() / 1000).slice(-4);
      this.password = this.userName;
      console.log("usernme : ", this.userName);
      console.log("password : ",this.password);
    }

    console.log(this.agentForm.value);
    
    // add agent logic here

  }
}