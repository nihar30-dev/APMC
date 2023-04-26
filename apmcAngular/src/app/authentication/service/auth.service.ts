import {Injectable} from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthService{
  private isLoggedIn = false;
  constructor(private http: HttpClient) {}
  private authApi = environment.ApiURL+'api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({'contentType': 'application/json' })
  };

  login(username: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    return this.http.post(
      this.authApi + 'signin',
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
      this.authApi + 'signup',
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
