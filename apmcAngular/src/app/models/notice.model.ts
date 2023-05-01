import {Slot} from "./slot.model";

export interface Notice{
  noticeId:number;
  noticeHeading : string;
  noticeContent : string;
  slot?:Slot;
}
