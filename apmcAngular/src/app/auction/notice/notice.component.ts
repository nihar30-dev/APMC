import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from "../../utils/storage.service";
import {Notice} from "../../models/notice.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit{
  noticeForm !: FormGroup;
  role='';


  constructor(private fb: FormBuilder, private noticeService: NoticeService,  private modalService: NgbModal,
              private storageService:StorageService, private toster: ToastrService) { }

  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      heading: ['', Validators.required],
      details: ['', Validators.required]
    });

    //for getting role
    this.role = this.storageService.getRole();
  }

  onSubmit(noticeForm: FormGroup) {

    // if(noticeForm.valid){
    //   console.log(noticeForm.value);
    // }
    if (noticeForm.valid) {
       const notice:Notice = {noticeId:0 , noticeHeading:noticeForm.value.heading , noticeContent:noticeForm.value.details ,slot:undefined}
      this.noticeService.addNotice(notice).subscribe(
        data => {
          this.toster.success('Notice added');
        },
        error => {
          this.toster.error(error.error['message']);
        }
      );
    }
  }

}
