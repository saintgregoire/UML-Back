import { IUser } from "./user.interface";

export interface IComment {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdOn: Date;
} 
