import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AgentService {

    constructor(private http: HttpClient){
    }

    private agent : any;

    createAgent(agent: any) {
        // this.shops.push(shop);
        console.log("in create agent");
        return this.http.post('http://localhost:8099/agent', agent);
    }
}