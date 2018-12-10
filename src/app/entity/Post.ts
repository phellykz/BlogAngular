import { User } from "./User";
import { Coment } from "./Coment";

export class Post{
    constructor() {}
    id: string;
    title: string;
    body: string;
    dateCreation: Date;
    autor: User;
    coments :  Array<Coment>;

}