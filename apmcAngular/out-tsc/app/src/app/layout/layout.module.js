import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
let LayoutModule = class LayoutModule {
};
LayoutModule = __decorate([
    NgModule({
        declarations: [
            HeaderComponent,
            SidebarComponent,
            FooterComponent
        ],
        imports: [
            CommonModule,
            AuthenticationModule,
            RouterModule,
            BrowserModule,
            FormsModule
        ],
        exports: [
            CommonModule,
            HeaderComponent,
            SidebarComponent,
            FooterComponent
        ]
    })
], LayoutModule);
export { LayoutModule };
//# sourceMappingURL=layout.module.js.map