import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router : Router){ }

  logIn(){
    this.router.navigate(['form'])
  }
  signup():void{
    this.router.navigate(['signup']);
  }
 
}
