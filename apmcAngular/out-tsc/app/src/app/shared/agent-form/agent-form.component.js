import { __decorate } from "tslib";
import { Agent } from 'src/app/models/agent.model';
import { Owner } from 'src/app/models/owner.model';
import { Shop } from 'src/app/models/shop.model';
import { User } from 'src/app/models/user.model';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let AgentFormComponent = class AgentFormComponent {
    constructor(fb, shopService, modalService, authervice, agentService, tosterService, router) {
        this.fb = fb;
        this.shopService = shopService;
        this.modalService = modalService;
        this.authervice = authervice;
        this.agentService = agentService;
        this.tosterService = tosterService;
        this.router = router;
        this.userName = '';
        this.password = '';
    }
    ngOnInit() {
        this.agentForm = this.fb.group({
            userId: [null],
            shopNo: [null, Validators.required],
            agentName: [null, Validators.required],
            companyName: [null, Validators.required],
            contact: [null, [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]],
        });
        this.shopService.getAllShopNo().subscribe((data) => {
            this.shopNo = data;
            this.availableShopNo = this.shopNo.filter(this.filterShops);
        });
    }
    filterShops(shop) {
        return shop['owner'] == null;
    }
    onSubmit(agentForm) {
        if (agentForm.valid) {
            // username, password generation
            // this.registerAgent(agentForm)
            this.addAgent(agentForm)
                .then(() => {
                this.modalService.close();
                this.router.navigate(['shops']);
                this.agentForm.reset();
            })
                .catch((error) => {
                this.tosterService.error(error.error['message']);
            });
        }
    }
    registerAgent(agentForm) {
        return new Promise((res, rej) => {
            this.userName = this.agentForm.value.agentName + (String)(Date.now()).slice(-4);
            this.password = this.userName;
            const user = new User(0, this.userName, this.password, agentForm.value.contact, ['agent']);
            this.authervice.register(user).subscribe(data => {
                this.agentId = data;
                res(data);
                this.tosterService.success('Registered successully!');
            }, error => {
                rej(error);
            });
        });
    }
    addAgent(agentForm) {
        return new Promise((res, rej) => {
            agentForm.value.userId = this.agentId;
            const agent = new Agent(new User(this.agentId, '', '', agentForm.value['contact'], ['admin']), agentForm.value['agentName'], agentForm.value['companyName'], agentForm.value['contact'], new Shop('', agentForm.value['shopNo'], new Owner(0)));
            this.agentService.createAgent(agent).subscribe((data) => {
                res(data);
                this.tosterService.success('Agent added successfully!');
            }, (error) => {
                this.tosterService.error(error.error['message']);
                rej(error);
            });
        });
    }
};
AgentFormComponent = __decorate([
    Component({
        selector: 'app-agent-form',
        templateUrl: './agent-form.component.html',
        styleUrls: ['./agent-form.component.scss']
    })
], AgentFormComponent);
export { AgentFormComponent };
//# sourceMappingURL=agent-form.component.js.map