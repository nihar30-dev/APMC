import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const UserKey = 'auth-user';
let StorageService = class StorageService {
    constructor() {
        this.role = new BehaviorSubject('DEFAULT');
        this.role$ = this.role.asObservable();
        this.isLoggedInSubject = new BehaviorSubject(false);
        this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
        this.isLoggedInSubject.next(this.isLoggedIn());
    }
    clean() {
        window.sessionStorage.clear();
    }
    saveUser(user) {
        window.sessionStorage.removeItem(UserKey);
        window.sessionStorage.setItem(UserKey, JSON.stringify(user));
        this.isLoggedInSubject.next(true);
    }
    getUser() {
        const user = window.sessionStorage.getItem(UserKey);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
    isLoggedIn() {
        const user = window.sessionStorage.getItem(UserKey);
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
    getToken() {
        const user = window.sessionStorage.getItem(UserKey);
        if (user) {
            return JSON.parse(user).token;
        }
        else {
            return null;
        }
    }
    emitRole() {
        this.role.next(this.getRole());
    }
    getRole() {
        const user = window.sessionStorage.getItem(UserKey);
        if (user) {
            return JSON.parse(user).roles[0];
        }
        else {
            return 'default';
        }
    }
};
StorageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map