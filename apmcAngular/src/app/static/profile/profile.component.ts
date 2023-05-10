import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/user-detail.model';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { StorageService } from 'src/app/utils/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  role ='';
  userDetailForm!: FormGroup;
  districts: string[] = ['xyz'];
  talukas: string[] = ['xyz'];
  private userDetails!: UserDetail;

  constructor(private fb: FormBuilder, 
              private userDetailService: UserDetailService, 
              private storageService: StorageService,
              private toasterService: ToastrService){}

  ngOnInit(){
    this.role = this.storageService.getRole();
    this.userDetailForm = this.fb.group({
      fullName: [null, Validators.required],
      district: [null, Validators.required],
      taluka: [null, Validators.required],
      village: [null, Validators.required],
      crops: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+(,[a-zA-Z]+)*$')]]
    });

    this.userDetailService.getDetailByUserId(this.storageService.getUser().id).subscribe(
      data => {
        this.userDetails = data;
        this.userDetailForm.patchValue({
          fullName: this.userDetails.fullName,
          district: this.userDetails.district,
          taluka: this.userDetails.taluka,
          village: this.userDetails.village,
          crops: this.userDetails.crops
        });
        
      }
    );
  }

  // openModal(content : any) {
  //   this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', centered : true } );
  // }

  onSubmitDetails(userDetailForm: FormGroup){
    if(userDetailForm.valid){
      const userDetail : UserDetail = new UserDetail(null,{id: this.storageService.getUser().id}, userDetailForm.value['fullName'], userDetailForm.value['district'], userDetailForm.value['taluka'], userDetailForm.value['village'], userDetailForm.value['crops']);  
      this.userDetailService.addUserDetail(userDetail).subscribe(()=>{
        this.toasterService.success('Details added successfully');
      });

      
      // this.modal.dismissAll();
      const user = this.storageService.getUser();
      user.userDetailsExist = true;
      this.storageService.saveUser(user);
    }
  }


}
