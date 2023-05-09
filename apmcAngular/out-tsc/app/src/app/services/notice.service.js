import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
let NoticeService = class NoticeService {
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({ 'contentType': 'application/json' })
        };
    }
    addNotice(notice) {
        return this.http.post(environment.ApiURL + 'notice', notice);
    }
    getNotice() {
        return this.http.get(environment.ApiURL + 'notice/notExpired');
    }
};
NoticeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NoticeService);
export { NoticeService };
//# sourceMappingURL=notice.service.js.map