import { IComment } from "../interfaces/comment.interface";

export class CommentDTO {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdOn: Date;

    constructor(comment: IComment) {
        this.id = comment.id;
        this.content = comment.content;
        this.authorId = comment.authorId;
        this.postId = comment.postId;
        this.createdOn = comment.createdOn;
    }
} 