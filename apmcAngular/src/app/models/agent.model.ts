import { Shop } from './shop.model';
import { User } from './user.model';

export class Agent {
  
  private shop: Shop;
  private user: User; 
  private agentName: string;
  private companyName: string;
  private contact: string;


  constructor(user:User, agentName:string, companyName:string, contact:string, shop:Shop){
      
    this.user = user;
    this.agentName = agentName;
    this.companyName = companyName;
    this.contact = contact;
    this.shop = shop;
      
  }
    
}
