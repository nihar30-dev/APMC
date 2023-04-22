export class Shop {
  
    constructor(private shopId: number, private shopNo: string, private userId: number, private companyName: string, private agentName: string, private contact: string){
        this.shopId = shopId;
        this.shopNo = shopNo;
        this.userId = userId;
        this.companyName = companyName;
        this.agentName = agentName;
        this.contact = contact;
    }
    
    getShopId(){
      return this.shopId;
    }
    getShopNo(){
      return this.shopNo;
    }
    getUserId(){
      return this.userId;
    }
    getCompanyName(){
      return this.companyName;
    }
    getAgentName(){
      return this.agentName;
    }
    getContact(){
      return this.contact;
    }
  }
