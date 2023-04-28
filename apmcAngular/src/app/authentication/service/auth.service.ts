import {Injectable} from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';


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
      },
      this.httpOptions
    );
  }


  getIsLoggedIn(){
    return of(this.isLoggedIn);
  }


  logout(): Observable<any> {
    console.log(this.http.post('http://localhost:8099/api/test/signout',{},this.httpOptions));
    return this.http.post('http://localhost:8099/api/test/signout', { }, this.httpOptions);

  }


}
