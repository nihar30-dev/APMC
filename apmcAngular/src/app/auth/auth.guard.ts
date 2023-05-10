import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {StorageService} from '../utils/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService:StorageService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot):  boolean {

    const currentRole = this.storageService.getRole();
    const requiredRole:string[] = route.data['role'];


    if(requiredRole.includes(currentRole)){
      return true;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You don\'t have access to this page!',
        confirmButtonColor:'#314731',
        confirmButtonText:'Back to Home'
      }).then(() => {
        this.router.navigate(['home']);
      });

      return false;
    }

  }
  
}
