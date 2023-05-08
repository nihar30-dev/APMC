

export class User  {

  private id: number;
  private username: string;
  private password: string;
  private contact: string;
  private role: string[];
  constructor(id : number, username: string, password : string,contact:string,role:string[]){
    this.id = id;
    this.username = username;
    this.password = password;
    this.role=role;
    this.contact = contact;
  }


  get getid(): number {
    return this.id;
  }

  set setid(value: number) {
    this.id = value;
  }

  get getusername(): string {
    return this.username;
  }

  set setusername(value: string) {
    this.username = value;
  }

  get getpassword(): string {
    return this.password;
  }

  set setpassword(value: string) {
    this.password = value;
  }

  get getcontact(): string {
    return this.contact;
  }

  set setcontact(value: string) {
    this.contact = value;
  }

  get getrole(): string[] {
    return this.role;
  }

  set setrole(value: string[]) {
    this.role = value;
  }
}

