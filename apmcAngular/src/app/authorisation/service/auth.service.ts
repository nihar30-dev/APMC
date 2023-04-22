import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private isloggedin = false;
    constructor(private http: HttpClient) {}
    private AUTH_API :string= 'http://localhost:8099/api/auth/';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    login(username: string, password: string): Observable<any> {
        this.isloggedin = true;
        return this.http.post(
            this.AUTH_API + 'signin',
            {
                username,
                password,
            },
            this.httpOptions
        );
    }

    register(username: string, password: string,contact:string): Observable<any> {
        this.isloggedin = true;
        return this.http.post(
            this.AUTH_API + 'signup',
            {
                username,
                password,
                contact
            },
            this.httpOptions
        );
    }


}
