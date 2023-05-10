
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

}
