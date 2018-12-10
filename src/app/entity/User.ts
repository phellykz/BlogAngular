import { Post } from "./Post";

export class User {
    constructor() {}
    
    id: string;
    name: string;
    email: string;
    dateRegister: Date;
    posts: Array<Post>;
 
}