import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(authService, storageService, router, socialAuthService, fb, toastService) {
        this.authService = authService;
        this.storageService = storageService;
        this.router = router;
        this.socialAuthService = socialAuthService;
        this.fb = fb;
        this.toastService = toastService;
        // isLoggedInuser = false;
        // isLoginFailed = false;
        this.errorMessage = '';
        this.roles = '';
    }
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.authService.googleSignin(user.idToken).subscribe({
                next: data => {
                    if (data.id == null) {
                        this.toastService.error('Incorrect Username or Password');
                    }
                    this.storageService.saveUser(data);
                    this.storageService.emitRole();
                    this.router.navigate(['home']);
                }
            });
        });
        this.storageService.role$.subscribe(data => {
            this.roles = data;
        });
        //
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }
    onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username, password).subscribe({
                next: data => {
                    if (data.id == null) {
                        this.toastService.error('Incorrect Username or Password');
                    }
                    else {
                        this.storageService.saveUser(data);
                        this.roles = this.storageService.getUser().roles;
                        this.router.navigate(['home']);
                        this.toastService.success('Login Successfully');
                    }
                },
                error: err => {
                    this.errorMessage = err.error.message;
                }
            });
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-username-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map