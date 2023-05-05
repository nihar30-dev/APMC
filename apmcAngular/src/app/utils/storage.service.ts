import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const UserKey = 'auth-user';


@Injectable({
  providedIn : 'root'
})
export class StorageService {

  private role: BehaviorSubject<string> = new BehaviorSubject<string>('DEFAULT');
  public role$: Observable<string> = this.role.asObservable();

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

  public getToken():string|null{
    const user = window.sessionStorage.getItem(UserKey);
    if(user){
      return JSON.parse(user).token;
    }
    else{
      return null;
    }

  }

  public emitRole(){
    this.role.next(this.getRole());
  }

  public getRole():string{
    const user = window.sessionStorage.getItem(UserKey);
    if(user){
      return  JSON.parse(user).roles[0];
    }
    else {
      return 'default';
    }

  }

  public getUserId(): number {
    const user = window.sessionStorage.getItem(UserKey);
    if (user) {
      return JSON.parse(user).id;
    }else {
      return 0;
    }
  }

}
