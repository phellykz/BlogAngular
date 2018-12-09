import { Post } from "./Post";

export class User {
    id: string;
    name: string;
    email: string;
    dateRegister: Date;
    posts: Array<Post>;
 
    constructor() {}
}