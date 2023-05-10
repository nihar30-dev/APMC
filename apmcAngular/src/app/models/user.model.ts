




export class User  {


  constructor( private id : number,
               private username: string, 
               private password: string,
               private contact: string,
               private role: string[]){
  }


  get getusername(): string {
    return this.username;
  }

  get getpassword(): string {
    return this.password;
  }


  get getcontact(): string {
    return this.contact;
  }


  get getrole(): string[] {
    return this.role;
  }


}

