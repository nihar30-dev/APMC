import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";
const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    NgModule({
        declarations: [
            LoginComponent,
            SignupComponent
        ],
        imports: [
            RouterModule.forRoot(routes),
            CommonModule,
            HttpClientModule,
            OAuthModule.forRoot(),
            FormsModule,
            GoogleSigninButtonModule,
            ReactiveFormsModule
        ],
        exports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], AuthenticationModule);
export { AuthenticationModule };
//# sourceMappingURL=authentication.module.js.map