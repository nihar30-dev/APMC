
import { AuthService } from 'src/app/authentication/service/auth.service';
import { StorageService } from 'src/app/utils/storage.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {translate} from '@angular/localize/tools';
// import {Chart, ChartType} from 'chart.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[TranslateService]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  imageURL = null;

  isDropdownVisible = false;

  selectedLanguage = 'en';




  constructor(private authService:AuthService,private storageService:StorageService,private router:Router,
              private translateService: TranslateService){
              this.selectedLanguage = this.translateService.currentLang;
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
    this.selectedLanguage = language;
  }

  ngOnInit(): void {


    this.switchLanguage('en') ;
    
    this.storageService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  logout(){
    this.storageService.clean();
  }


}
