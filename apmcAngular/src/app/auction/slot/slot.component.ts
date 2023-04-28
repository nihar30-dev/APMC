import { Component } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-admin-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {
  
  constructor(private modalService:ModalService) {
  }

  open(formName : string){
    return this.modalService.open(formName);

  }
}
