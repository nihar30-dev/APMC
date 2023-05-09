import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let InterceptorService = class InterceptorService {
    constructor(storageService) {
        this.storageService = storageService;
    }
    intercept(req, next) {
        this.token = this.storageService.getToken();
        if (this.token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.token)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
};
InterceptorService = __decorate([
    Injectable()
    /**
     * attaches X-XSRF-TOKEN to every backend api request
     * token used to prevent api call from postman or other related softwares
     */
], InterceptorService);
export { InterceptorService };
//# sourceMappingURL=interceptor.service.js.map