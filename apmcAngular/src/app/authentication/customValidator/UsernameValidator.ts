
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {map, Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';




// eslint-disable-next-line require-jsdoc
export  function usernameExistsValidator(authService:AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return authService.getusername(control.value).pipe(
      map(res => {
        return res ? { usernameExists: true } : null;
      })
    );
  };
}
