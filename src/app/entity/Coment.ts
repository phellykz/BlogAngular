import { User } from "./User";

export class Coment {
    id: string;
    body: string;
    date: Date;
    author: User;

    constructor () {}
}