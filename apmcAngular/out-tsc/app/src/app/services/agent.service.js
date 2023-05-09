import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
let AgentService = class AgentService {
    constructor(http) {
        this.http = http;
    }
    createAgent(agent) {
        // this.shops.push(shop)
        return this.http.post(environment.ApiURL + 'agent', agent);
    }
};
AgentService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AgentService);
export { AgentService };
//# sourceMappingURL=agent.service.js.map