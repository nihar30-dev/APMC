import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderVisible = new BehaviorSubject<boolean>(false);

  show() {
    this.loaderVisible.next(true);
  }

  hide() {
    this.loaderVisible.next(false);
  }

  getLoaderVisibility() {
    return this.loaderVisible.asObservable();
  }
}
