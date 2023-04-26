import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  display!: Observable<'open' | 'close'>;

  constructor(public modalService: ModalService){}

  close(){
    return this.modalService.close();
  }

  ngOnInit(){
    //watch modal service
    this.display = this.modalService.watch(); 
  }
}
