import {Injectable} from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";

const USER_KEY = 'auth-user';


@Injectable({
    providedIn : 'root'
})
export class StorageService{

    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

    constructor() {
    }


    clean(): void {
        window.sessionStorage.clear();
        
    }

    public saveUser(user: any) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.isLoggedInSubject.next(true);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            console.log(user);
            return JSON.parse(user);
        }

        return {};
    }

    public isLoggedIn(){
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return this.isLoggedInSubject.next(true);
        }

        return this.isLoggedInSubject.next(false);
    }

}
