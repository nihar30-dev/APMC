import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../utils/storage.service';
import { Notice } from '../../models/notice.model';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
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
  pageSize = 10;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private noticeService: NoticeService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private toster: ToastrService,
    public loaderService: LoaderService
  ) { }


  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      heading: ['', Validators.required],
      details: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    });

    this.role = this.storageService.getRole();
    this.notifications = [];
    this.loadMore();
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

    if(this.pageNumber*10<=this.notifications.length){
    this.noticeService.getNotice(this.pageNumber, this.pageSize)
      .subscribe(
        (notifications: any) => {
          if (notifications.length > 0) {
            this.notifications.push(...notifications);
          } else {
            // no more data, stop loading
            this.isLoading = false;
          }
        },
        (error: any) => {
          console.error(error);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
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
        console.log(data);
      },
      (error) => {
        this.toster.error(error.error['message']);
      }
    );
  }

  activeIds: string[] = [];
  length = 0;
  panels: number[] = [];

  openAll() {
    this.activeIds = this.panels.map((p) => 'panel-' + p);
    console.log(this.activeIds);
  }
}

