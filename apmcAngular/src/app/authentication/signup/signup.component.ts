import {AuthService} from '../service/auth.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {StorageService} from '../../utils/storage.service';
import {Route, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

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
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,{ validator: this.checkPasswords }],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;

    return password === confirmPassword ? null : { notSame: true };
  }




  onSubmit(): void {
    console.log(this.signupForm.value);
    const { username, password,contact } = this.signupForm.value;
    // const user:User = {...this.form};
    const user = new User(0,username,password,contact,[]);
    console.log(user);

    this.authService.register(user).subscribe({
      next: (data) => {
        if(data.success === false){
          this.toastService.error('Invalid username or password');
        }
        else {
          console.log(data.success === false);
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

  onReset(): void {
    this.signupForm.reset();
    this.isSuccessful = false;
    this.isSignUpFailed = false;
  }
}
