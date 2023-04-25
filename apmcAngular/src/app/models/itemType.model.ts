// export class ItemType{

//     constructor(private itemTypeName:string){
//     }

    
//     getItemTypeName() {
//         return this.itemTypeName;
//     }

//     setItemTypeName(itemTypeName: string){
//         this.itemTypeName = itemTypeName;
//     }
// }

export class ItemType{

	private itemTypeName:string;
	private itemTypeId : number;

	constructor(itemTypeId : number, itemTypeName: string){

		this.itemTypeId = itemTypeId;
		this.itemTypeName = itemTypeName;
	}

}