import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const UserKey = 'auth-user';


@Injectable({
  providedIn : 'root'
})
export class StorageService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();





  constructor() {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }




  clean(): void {
    window.sessionStorage.clear();

  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(UserKey);
    window.sessionStorage.setItem(UserKey, JSON.stringify(user));
    this.isLoggedInSubject.next(true);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(UserKey);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn() : boolean{
    const user = window.sessionStorage.getItem(UserKey);

    if(user){
      return true;
    }
    else{
      return false;
    }
  }

}
