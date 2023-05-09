import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader-mask',
  templateUrl: './loader-mask.component.html',
  styleUrls: ['./loader-mask.component.scss']
})
export class LoaderMaskComponent {
  loaderVisible!: boolean;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.getLoaderVisibility().subscribe(visible => {
      this.loaderVisible = visible;
    });
  }
}
