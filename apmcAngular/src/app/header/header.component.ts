import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authorisation/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(private router : Router, private authService: AuthService){ }
 
}