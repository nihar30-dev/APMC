import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ItemService} from 'src/app/services/item.service';
import {DailyRates} from 'src/app/models/dailyRates.model';
import {DailyRatesService} from 'src/app/services/daily-rates.service';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ItemType} from 'src/app/models/itemType.model';
import {DateFormatter} from 'src/app/utils/dateFormatter';
import {CustomDateParserFormatter} from '../CustomDateParserFormatter';

@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class UserRatesComponent implements OnInit{

  items: DailyRates[] = [];
  itemList! : DailyRates[];
  itemTypes! : ItemType[];
  
  activateSearch = false;
  searchQuery = '';
  date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  selectedDate = '';
  maxDate: NgbDate;
  protected readonly indexedDB = indexedDB;
  model2: any;
  active = 'ngb-nav-0';

  constructor( 
    private itemService : ItemService,
    private dateformatter: DateFormatter, 
    private calendar : NgbCalendar,
    private dailyRateService: DailyRatesService,
    private toastr: ToastrService,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>)
  {
    this.maxDate = calendar.getToday();
  }

  ngOnInit(){
    this.active = 'ngb-nav-0';
    const date = new Date();
    const day:string = this.dateformatter.dateinyyyymmdd(date);
    this.selectedDate = `${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`;
    this.model2 = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    console.log(this.selectedDate);
    this.loadItemTypes();
    this.dailyRateService.getDailyRatesByDate(day).subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      this.showContainer(0);
    }, error =>{
      this.toastr.info('No rates for this date');
      console.log(this.toastr);
      
    });
  }

  //datepicker methods
  onDateSelect(dp: any) {
    console.log(dp._inputValue);
    console.log(typeof dp._inputValue);
    this.selectedDate = `${this.date?.year}-${(this.date?.month+'').padStart(2, '0')}-${(this.date?.day+'').padStart(2, '0')}`;
    const day:string = dp._inputValue.slice(6)+'-'+dp._inputValue.slice(3,5)+'-'+dp._inputValue.slice(0,2);
    console.log('format : ',day);
    this.selectedDate =day;
    this.showContainer(0);
  }

  //load ItemTypes
  loadItemTypes() {

    return new Promise((res, rej) => {
      this.itemService.getItemTypes().subscribe((data) => {
        this.itemTypes = data;
        res(this.itemTypes);
      }, (error) => {
        rej(error);
      });
    });
  }


  // list methods
  showContainer(a: any) {
    console.log(a);
    this.itemList = [];
    this.dailyRateService.getDailyRatesByDateAndItemType(this.selectedDate, a+1).subscribe((data)=>{
      this.itemList = data;
      console.log(this.itemList);
      if(this.itemList.length == 0)
        this.toastr.info('No data found');
      // console.log(this.itemList);
      
    }, () =>{
      this.toastr.error('No data found');
    });
    // this.loadItem(a)
    //   .then(() => this.initForm())
    //   .catch((error) => {
    //     console.log(error);
    //     alert(error);
    //   });
    this.activateSearch = true;
  }


}


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: DailyRates[], searchQuery: string): any[] {
    if (!items || !searchQuery) {
      return items;
    }
    return items.filter(item => item['item']['itemName'].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  }
}
