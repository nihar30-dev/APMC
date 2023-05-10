import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../utils/storage.service';
import { Notice } from '../../models/notice.model';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import { CustomDateParserFormatter } from 'src/app/base/dailyRates/CustomDateParserFormatter';



@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class NoticeComponent implements OnInit {
  noticeForm!: FormGroup;
  role = '';
  notifications!: Notice[];
  day = '';
  date: NgbDateStruct | null = null;
  date1: Date | null = null;
  selectedDate = '';
  maxDate!: NgbDate;
  model2: any;
  pageNumber = 0;
  pageSize = 12;
  isLoading = false;

  constructor(
      private fb: FormBuilder,
      private noticeService: NoticeService,
      private modalService: NgbModal,
      private storageService: StorageService,
      private toster: ToastrService,
      public loaderService: LoaderService,
      public noticeModal : NgbModal
  ) { }


  open(content: any) {
    return this.noticeModal.open(content, { centered: true });
  }

  ngOnInit(): void {

    this.noticeForm = this.fb.group({
      heading: ['', Validators.required],
      details: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    });

    this.role = this.storageService.getRole();
    this.notifications = [];
    // this.loaderService.show();
    this.loadMore();
    // this.loaderService.hide();
  }

  onScroll(event: any): void {

    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.pageNumber++;
      this.loadMore();
    }
  }

  loadMore(): void {
    this.isLoading = true;

    if(this.pageNumber*this.pageSize<=this.notifications.length){
      this.loaderService.show();
      this.noticeService.getNotice(this.pageNumber, this.pageSize)
        .subscribe(
          (notifications: any) => {
            if (notifications.length >= this.notifications.length) {
              this.notifications.push(...notifications);
            } else {
              // no more data, stop loading
              this.isLoading = false;
            }
            this.loaderService.hide();
          },
          () => {
            this.isLoading = false;
            this.loaderService.hide();
          },
          () => {
            this.isLoading = false;
            this.loaderService.hide();
          }
        );

    }

  }
  onSubmit(noticeForm: FormGroup) {
    const notice: Notice = {
      noticeId: 0,
      noticeHeading: noticeForm.value.heading,
      noticeContent: noticeForm.value.details,
      createdAt: new Date(),
      startDate: new Date(noticeForm.value.startDate.year, noticeForm.value.startDate.month - 1, noticeForm.value.startDate.day + 1), // Convert to Date object
      endDate: new Date(noticeForm.value.endDate.year, noticeForm.value.endDate.month - 1, noticeForm.value.endDate.day + 1), // Convert to Date object
      slot: undefined
    };

    this.noticeService.addNotice(notice).subscribe(
      (data) => {
        this.toster.success('Notice added');
      },
      (error) => {
        this.toster.error(error.error['message']);
      }
    );
    this.noticeModal.dismissAll('done');
    this.noticeModal.dismissAll();
  }

  activeIds: string[] = [];
  length = 0;
  panels: number[] = [];


}


