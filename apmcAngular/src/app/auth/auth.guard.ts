import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "../utils/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService:StorageService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | any{

    const currentRole = this.storageService.getRole();
    const requiredRole:string[] = route.data['role'];
    console.log(currentRole);
    console.log(requiredRole);
    console.log(currentRole in requiredRole);

    if(requiredRole.includes(currentRole)){
      return true;
    }
     else {

       this.router.navigate(['home']);
       return false;
    }

  }
  
}
