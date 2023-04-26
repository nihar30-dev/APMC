export class User{
    
  private id : number;
  private username : string;
  private password : string;
  constructor(id : number, username: string, password : string){
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
