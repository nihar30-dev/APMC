import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { usernameExistsValidator } from '../customValidator/UsernameValidator';
import { Validators } from '@angular/forms';
let SignupComponent = class SignupComponent {
    constructor(authService, storageService, router, formBuilder, toastService) {
        this.authService = authService;
        this.storageService = storageService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.toastService = toastService;
        this.form = {
            username: null,
            password: null,
            confirmPassword: null,
            contact: null
        };
        this.isSuccessful = false;
        this.isSignUpFailed = false;
        this.errorMessage = '';
        this.roles = [];
        this.passwordMatcher = (control) => {
            const password = control.get('password');
            const confirmPassword = control.get('confirmPassword');
            return password?.value !== confirmPassword?.value ? { 'passwordMatched': true } : null;
        };
    }
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', { validators: [Validators.required], asyncValidators: [usernameExistsValidator(this.authService)] }],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            contact: ['', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]]
        }, { validators: [this.passwordMatcher] });
    }
    onSubmit() {
        const { username, password, contact } = this.signupForm.value;
        const user = new User(0, username, password, contact, []);
        this.authService.register(user).subscribe({
            next: (data) => {
                if (data.success === false) {
                    this.toastService.error('Invalid username or password');
                }
                else {
                    this.isSuccessful = true;
                    this.isSignUpFailed = false;
                    this.router.navigate(['login']);
                    this.toastService.success('Successfully Registered');
                }
            },
            error: err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        });
    }
};
SignupComponent = __decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss']
    })
], SignupComponent);
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map