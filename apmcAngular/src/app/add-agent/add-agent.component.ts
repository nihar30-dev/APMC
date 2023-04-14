import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  agentForm!: FormGroup;

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
      agentName: ['', Validators.required],
      contact: ['', Validators.required],
      companyName: ['', Validators.required]
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
    console.log(this.agentForm.value);
    // add agent logic here
  }
}