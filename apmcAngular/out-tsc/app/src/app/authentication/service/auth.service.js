import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpHeaders } from '@angular/common/http';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.isLoggedIn = false;
        this.authApi = environment.ApiURL + 'api/auth/';
        this.httpOptions = {
            headers: new HttpHeaders({ 'contentType': 'application/json' })
        };
    }
    login(username, password) {
        this.isLoggedIn = true;
        return this.http.post(this.authApi + 'signin', {
            username,
            password,
        }, this.httpOptions);
    }
    googleSignin(accessToken) {
        this.isLoggedIn = true;
        return this.http.post(this.authApi + 'google?idToken=' + accessToken, this.httpOptions);
    }
    register(user) {
        const username = user.getusername;
        const password = user.getpassword;
        const contact = user.getcontact;
        const role = user.getrole;
        console.log(user);
        this.isLoggedIn = true;
        return this.http.post(this.authApi + 'signup', {
            username,
            password,
            contact,
            role
        }, this.httpOptions);
    }
    getusername(username) {
        return this.http.get(this.authApi + username, this.httpOptions);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map