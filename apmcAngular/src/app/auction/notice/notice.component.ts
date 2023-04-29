import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from "../../utils/storage.service";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit{
  noticeForm !: FormGroup;
  role='';

  constructor(private fb: FormBuilder, private noticeService: NoticeService,  private modalService: NgbModal,
              private storageService:StorageService) { }

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
      this.noticeService.addNotice(noticeForm.value.heading.value, noticeForm.value.details.value).subscribe(
        data => {
          alert('Notice Added' + data);
        },
        error => {
          alert(error.error['message']);
        }
      );
    }
  }

}