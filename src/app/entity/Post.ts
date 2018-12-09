import { Coment } from './Coment';
import { User } from './User';

export class Post{
    id: string;
    title: string;
    body: string;
    dateCreation: Date;
    autor: User;
    coments :  Array<Coment>;

    constructor() {}
}