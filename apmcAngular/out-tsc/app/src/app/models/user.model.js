export class User {
    constructor(id, username, password, contact, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.contact = contact;
    }
    get getid() {
        return this.id;
    }
    set setid(value) {
        this.id = value;
    }
    get getusername() {
        return this.username;
    }
    set setusername(value) {
        this.username = value;
    }
    get getpassword() {
        return this.password;
    }
    set setpassword(value) {
        this.password = value;
    }
    get getcontact() {
        return this.contact;
    }
    set setcontact(value) {
        this.contact = value;
    }
    get getrole() {
        return this.role;
    }
    set setrole(value) {
        this.role = value;
    }
}
//# sourceMappingURL=user.model.js.map