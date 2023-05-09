import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { Shop } from 'src/app/models/shop.model';
import { User } from 'src/app/models/user.model';
import { Owner } from 'src/app/models/owner.model';
let ShopsComponent = class ShopsComponent {
    constructor(shopService, formBuilder, modalService2, shopModal, toaster, storageService, authervice, agentService, tosterService, router) {
        this.shopService = shopService;
        this.formBuilder = formBuilder;
        this.modalService2 = modalService2;
        this.shopModal = shopModal;
        this.toaster = toaster;
        this.storageService = storageService;
        this.authervice = authervice;
        this.agentService = agentService;
        this.tosterService = tosterService;
        this.router = router;
        this.role = '';
        this.closeResult = '';
        this.userName = '';
        this.password = '';
        this.title = 'datatables';
        this.dtOptions = {};
    }
    open(content) {
        return this.shopModal.open(content, { centered: true });
    }
    ngOnInit() {
        //dataTable options
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
        };
        //list population 
        this.shopService.getAllShops().subscribe((data) => {
            //for getting roles
            this.storageService.role$.subscribe(data => {
                this.role = data;
            });
            this.role = this.storageService.getRole();
            this.agents = data;
            console.log(data);
        });
        // form builder
        this.f = this.formBuilder.group({
            shopNo: ['', [Validators.required, Validators.pattern('[A-Z]-[0-9]{1,3}')]]
        });
        this.agentForm = this.formBuilder.group({
            userId: [null],
            shopNo: [null, Validators.required],
            agentName: [null, Validators.required],
            companyName: [null, Validators.required],
            contact: [null, [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]],
        });
        this.shopService.getAllShopNo().subscribe((data) => {
            this.shopNo = data;
            this.availableShopNo = this.shopNo.filter(this.filterShops);
            console.log(data);
        });
    }
    filterShops(shop) {
        return shop['owner'] == null;
    }
    // onSubmit(f : FormGroup) {
    //   if(f.valid){
    //     this.shopService.createShop(f.value);
    //   }
    // }
    //modal panel render methods 
    // open(formName : string){
    //   return  this.modalService.open(formName);
    // } 
    onSubmitShop(shopForm) {
        if (shopForm.valid) {
            this.shopService.createShop(shopForm.value).subscribe(data => {
                this.toaster.success('Shop added successfully');
            }, (error) => {
                this.toaster.error(error.error['message']);
            });
            this.shopModal.dismissAll('done');
            this.shopModal.dismissAll();
        }
    }
    onSubmit(agentForm) {
        if (agentForm.valid) {
            // username, password generation
            // this.registerAgent(agentForm)
            this.addAgent(agentForm)
                .then(() => {
                this.modalService2.close();
                this.router.navigate(['shops']);
                this.agentForm.reset();
            })
                .catch((error) => {
                this.tosterService.error(error.error['message']);
            });
        }
    }
    addAgent(agentForm) {
        return new Promise((res, rej) => {
            agentForm.value.userId = this.agentId;
            const agent = new Agent(new User(this.agentId, '', '', agentForm.value['contact'], ['admin']), agentForm.value['agentName'], agentForm.value['companyName'], agentForm.value['contact'], new Shop('', agentForm.value['shopNo'], new Owner(0)));
            console.log(agent);
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
ShopsComponent = __decorate([
    Component({
        selector: 'app-shops',
        templateUrl: './shops.component.html',
        styleUrls: ['./shops.component.scss']
    })
], ShopsComponent);
export { ShopsComponent };
//# sourceMappingURL=shops.component.js.map