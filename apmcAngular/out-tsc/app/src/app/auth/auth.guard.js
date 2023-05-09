import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(storageService, router) {
        this.storageService = storageService;
        this.router = router;
    }
    canActivate(route, state) {
        const currentRole = this.storageService.getRole();
        const requiredRole = route.data['role'];
        console.log(currentRole);
        console.log(requiredRole);
        console.log(currentRole in requiredRole);
        if (requiredRole.includes(currentRole)) {
            return true;
        }
        else {
            this.router.navigate(['home']);
            return false;
        }
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map