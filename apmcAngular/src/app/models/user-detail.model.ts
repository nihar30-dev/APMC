
export class UserDetail{
  constructor(
        public id: number|null,
        public user: 
                        {
                            id: number
                        },
        public fullName: string,
        public district: string,
        public taluka: string,
        public village: string,
        public crops: string){}


  // public getUserId(): number{
  //     return this.user.id;
  // }
  // public getFullName(): String{
  //     return this.fullName;
  // }
  // public getDistrict(): String{
  //     return this.district;
  // }
  // public getTaluka(): String{
  //     return this.taluka;
  // }
  // public getVillage(): String{
  //     return this.village;
  // }
  // public getcrops(): String{
  //     return this.crops;
  // }
}
