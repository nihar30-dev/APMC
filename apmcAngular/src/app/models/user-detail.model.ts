import { User } from "./user.model";

export class UserDetail{
    constructor(private user: {id: number},
        private fullName: string,
        private district: string,
        private taluka: string,
        private village: string,
        private crops: string){}
}