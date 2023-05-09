// import { AuthService } from 'src/app/authentication/service/auth.service';
// import { StorageService } from 'src/app/utils/storage.service';
// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit {
//   isLoggedIn = false;
//
//   constructor(private authService:AuthService,private storageService:StorageService){
//   }
//
//   ngOnInit(): void {
//
//     this.storageService.isLoggedIn$.subscribe((data) => {
//       this.isLoggedIn = data;
//     });
//
//     this.isLoggedIn = this.storageService.isLoggedIn();
//
//
//   }
//
//   logout(){
//     this.storageService.clean();
//   }
//
//   //  hello(){
//   //   console.log(this.isLoggedIn);
//   //   this.authService.getIsLoggedIn().subscribe((data) => {
//   //     this.isLoggedIn = data;
//   //     console.log("isnide header component:",data);
//   //   });
// }
import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
let HeaderComponent = class HeaderComponent {
    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
    }
    constructor(authService, storageService, router) {
        this.authService = authService;
        this.storageService = storageService;
        this.router = router;
        this.isLoggedIn = false;
        this.imageURL = null;
        this.isDropdownVisible = false;
    }
    ngOnInit() {
        this.storageService.isLoggedIn$.subscribe((data) => {
            this.isLoggedIn = data;
        });
        this.isLoggedIn = this.storageService.isLoggedIn();
    }
    sidebar() {
        this.router.navigate(['userRates']);
    }
    logout() {
        this.storageService.clean();
    }
    createChart() {
        let chart = new Chart('MyChart', {
            type: 'line',
            data: {
                labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
                    '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
                datasets: [
                    {
                        label: 'Sales',
                        data: ['467', '576', '572', '79', '92',
                            '574', '573', '576'],
                        backgroundColor: 'blue'
                    },
                    {
                        label: 'Profit',
                        data: ['542', '542', '536', '327', '17',
                            '0.00', '538', '541'],
                        backgroundColor: 'limegreen'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }
        });
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map