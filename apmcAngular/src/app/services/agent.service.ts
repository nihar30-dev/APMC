import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../models/agent.model';
import {environment} from '../../../environment';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient){
  }
  

  createAgent(agent: Agent) {
    // this.shops.push(shop)
    return this.http.post(environment.ApiURL+'agent', agent);
  }
}
