

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

  set getid(value: number) {
    this.id = value;
  }

  get getusername(): string {
    return this.username;
  }

  set getusername(value: string) {
    this.username = value;
  }

  get getpassword(): string {
    return this.password;
  }

  set getpassword(value: string) {
    this.password = value;
  }

  get getcontact(): string {
    return this.contact;
  }

  set getcontact(value: string) {
    this.contact = value;
  }

  get getrole(): string[] {
    return this.role;
  }

  set getrole(value: string[]) {
    this.role = value;
  }
}

