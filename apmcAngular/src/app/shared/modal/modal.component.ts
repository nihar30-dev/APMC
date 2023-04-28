import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

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
    this.display = this.modalService.watch(); 
  }
}
