import {AuthService} from '../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {StorageService} from '../../utils/storage.service';
import { Router} from '@angular/router';
import {usernameExistsValidator} from '../customValidator/UsernameValidator';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  form: any = {
    username: null,
    password: null,
    confirmPassword:null,
    contact: null
  };

  signupForm!: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private authService: AuthService , private storageService:StorageService,
              private router:Router , private formBuilder: FormBuilder, private toastService:ToastrService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', {validators : [Validators.required] , asyncValidators:[usernameExistsValidator(this.authService)] }],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]]
    },{validators : [this.passwordMatcher]});
  }



  passwordMatcher: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { 'passwordMatched': true } : null;
  };


  onSubmit(): void {

    const { username, password,contact } = this.signupForm.value;

    const user = new User(0,username,password,contact,[]);


    this.authService.register(user).subscribe({
      next: (data) => {
        if(data.success === false){
          this.toastService.error('Invalid username or password');
        }
        else {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['login']);
          this.toastService.success('Successfully Registered');
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
