import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from './storage.service';

@Injectable()

/**
 * attaches X-XSRF-TOKEN to every backend api request
 * token used to prevent api call from postman or other related softwares
 */

export class InterceptorService implements HttpInterceptor {
  token: any;
  constructor(
        private storageService: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.storageService.getToken();
    if (this.token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+ this.token)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
