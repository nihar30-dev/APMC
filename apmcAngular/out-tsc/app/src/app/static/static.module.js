import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
const routes = [
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'gallery', component: GalleryComponent }
];
let StaticModule = class StaticModule {
};
StaticModule = __decorate([
    NgModule({
        declarations: [
            AboutUsComponent,
            ContactComponent,
            GalleryComponent
        ],
        imports: [
            RouterModule.forRoot(routes),
            CommonModule
        ]
    })
], StaticModule);
export { StaticModule };
//# sourceMappingURL=static.module.js.map