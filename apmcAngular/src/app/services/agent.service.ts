import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Agent } from "../models/agent.model";


@Injectable({
    providedIn: 'root'
})
export class AgentService {

    constructor(private http: HttpClient){
    }

    private agent : any;

    createAgent(agent: Agent) {
        // this.shops.push(shop)
        return this.http.post<Agent>('http://localhost:8099/agent', agent);
    }
}