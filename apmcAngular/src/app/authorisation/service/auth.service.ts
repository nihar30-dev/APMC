import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class AuthService{
  private isLoggedIn = false;
  constructor(private http: HttpClient) {}
  private AUTH_API = 'http://localhost:8099/api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(username: string, password: string): Observable<any> {
    this.isLoggedIn = true;
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
    this.isLoggedIn = true;
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

  

  getIsLoggedIn(){
    return of(this.isLoggedIn);
  }


}
