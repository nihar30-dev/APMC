import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { SlotFormComponent } from './slot-form/slot-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ModalComponent,
    ItemFormComponent,
    AgentFormComponent,
    ShopFormComponent,
    SlotFormComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports : [ModalComponent]
})
export class SharedModule { }
