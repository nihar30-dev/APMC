import { Component, OnInit } from '@angular/core';

import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


ngOnInit(): void {


  const myCarousel = document.querySelector('#myCarousel');
  if (myCarousel) {
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: 2000,
      wrap: true
    });
  }
  
  
}

}
