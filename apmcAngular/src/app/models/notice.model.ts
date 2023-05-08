import {Slot} from './slot.model';

export interface Notice{
  noticeId:number;
  noticeHeading : string;
  noticeContent : string;
  createdAt : Date;
  startDate : Date;
  endDate : Date;
  slot?:Slot;
}
