import {Injectable, OnInit} from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";

const USER_KEY = 'auth-user';


@Injectable({
    providedIn : 'root'
})
export class StorageService implements OnInit{

    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

    constructor() {

    }

    ngOnInit(): void {
        this.isLoggedInSubject.next(this.isLoggedIn());
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
            return JSON.parse(user);
        }

        return {};
    }

    public isLoggedIn() : boolean{
        const user = window.sessionStorage.getItem(USER_KEY);
       
        if(user){
            return true;
        }
        else{
            return false;
        }
    }

}
