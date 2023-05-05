import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/user-detail.model';
import { User } from 'src/app/models/user.model';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { StorageService } from 'src/app/utils/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  role: string ='';
  userDetailForm!: FormGroup;
  districts: String[] = ['xyz'];
  talukas: String[] = ['xyz'];

  constructor(private fb: FormBuilder, 
              private userDetailService: UserDetailService, 
              private storageService: StorageService,
              private toasterService: ToastrService,
              private modal: NgbModal){}

  ngOnInit(){
    this.role = this.storageService.getRole();

    this.userDetailForm = this.fb.group({
      fullName: [null, Validators.required],
      district: [null, Validators.required],
      taluka: [null, Validators.required],
      village: [null, Validators.required],
      crops: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+(,[a-zA-Z]+)*$')]]
    });
  }

  openModal(content : any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title', centered : true } );
  }

  onSubmitDetails(userDetailForm: FormGroup){
    if(userDetailForm.valid){
      const userDetail : UserDetail = new UserDetail({id: this.storageService.getUser().id}, userDetailForm.value['fullName'], userDetailForm.value['district'], userDetailForm.value['taluka'], userDetailForm.value['village'], userDetailForm.value['crops']);  
      this.userDetailService.addUserDetail(userDetail).subscribe(()=>{
        this.toasterService.success('Details added successfully');
      });

      this.userDetailForm.reset();
      this.modal.dismissAll();
      this.storageService.saveUser
    }
  }


}
