import { Owner } from './owner.model';

export class Shop{
 
    
  private shopNo : string;
  private shopId : number;
  private owner : Owner;
  constructor(shopNo : string, shopId: number, owner: Owner){
    this.shopNo = shopNo;
    this.shopId = shopId;
    this.owner = owner;
  }
}
