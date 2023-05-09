import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {PdfgeneratorService} from './service/pdfgenerator.service';
import {Agent} from '../../../models/agent.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss']
})
@Injectable({providedIn:'root'})
export class PdfGeneratorComponent {
  
  @ViewChild('pdf') elementRef!:ElementRef;
  data!:Agent[];
  constructor(private pdfGeneratorService: PdfgeneratorService) {}

  // ngOnInit() {
  //   this.pdfGeneratorService.getData().subscribe((data) => {
  //     this.data = data;
  //     console.log(data);
  //   });
  // }

  makePdf(data:Agent[]){
    const pdf = new  jsPDF();
    pdf.html(this.elementRef.nativeElement , {
      callback:(pdf) => {
        pdf.save('shops.pdf');
      }
    });  
  }

}
