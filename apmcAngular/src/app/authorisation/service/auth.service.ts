import {Injectable} from '@angular/core';
<<<<<<< Updated upstream
import {environment} from '../../../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
=======
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
>>>>>>> Stashed changes

@Injectable({
  providedIn:'root'
})
export class AuthService{
<<<<<<< Updated upstream
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
=======
  private isloggedin = false;
  constructor(private http: HttpClient) {}
  private AUTH_API = 'http://localhost:8099/api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(username: string, password: string): Observable<any> {
    this.isloggedin = true;
    return this.http.post(
      this.AUTH_API + 'signin',
>>>>>>> Stashed changes
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

<<<<<<< Updated upstream
  googleSignin(accessToken:string):Observable<any>{
    this.isLoggedIn = true;
    return this.http.post(
      this.authApi + 'google?idToken='+accessToken
      ,
      this.httpOptions
    );

  }

  register(user:User): Observable<any> {
    const username = user.getusername;
    const  password:string = user.getpassword;
    const contact = user.getcontact;
    const role = user.getrole;
    
    this.isLoggedIn = true;
    return this.http.post(
      this.authApi + 'signup',
      {
        username,
        password,
        contact,
        role
=======
    register(username: string, password: string): Observable<any> {
    this.isloggedin = true;
    return this.http.post(
      this.AUTH_API + 'signup',
      {
        username,
        password
>>>>>>> Stashed changes
      },
      this.httpOptions
    );
  }

<<<<<<< Updated upstream
  

  getIsLoggedIn(){
    return of(this.isLoggedIn);
  }

=======
  logout(): Observable<any> {
    console.log(this.http.post('http://localhost:8099/api/test/signout',{},this.httpOptions));
    return this.http.post('http://localhost:8099/api/test/signout', { }, this.httpOptions);

  }
>>>>>>> Stashed changes

}
