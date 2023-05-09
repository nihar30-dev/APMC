import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderMaskComponent } from './loader-mask/loader-mask.component';




@NgModule({
  declarations: [
    LoaderMaskComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports : [LoaderMaskComponent]
})
export class SharedModule { }
