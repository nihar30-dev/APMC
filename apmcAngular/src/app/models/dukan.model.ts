export class Dukan {

    constructor(private shopId: number, private shopNo: String){
        this.shopId = shopId;
        this.shopNo = shopNo;
    }
    
    getShopId(){
        return this.shopId;
    }

    setShopId(shopId: number){
        this.shopId = shopId;
    }

    getShopNo(){
        return this.shopNo;
    }

    setShopNo(shopNo : String){
        this.shopNo = shopNo;
    }
    
}