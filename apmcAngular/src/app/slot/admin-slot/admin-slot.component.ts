import { Component } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-admin-slot',
  templateUrl: './admin-slot.component.html',
  styleUrls: ['./admin-slot.component.scss']
})
export class AdminSlotComponent {
  
  constructor(private modalService:ModalService) {
  }

  open(formName : string){
    return this.modalService.open(formName);

  }
}
