import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { StorageService } from './authorisation/service/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

constructor(private router : Router,private storageService:StorageService){

}
ngOnInit(){

  
  
}
}
