import { Component } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'APMC';
  constructor(private readonly google : GoogleApiService){

  }
}
