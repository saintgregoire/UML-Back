import { IComment } from "../interfaces/comment.interface";
import { IPhoto } from "../interfaces/photo.interface";
import { IPost } from "../interfaces/post.interface";
import { IUser } from "../interfaces/user.interface";

export class PostDTO {
    id: string;
    title: string;
    description: string;
    geoURL: string;
    author: IUser;
    difficultyLvl: number;
    photos: IPhoto[];
    duration: number;
    status: "pending" | "canceled" | "valid";
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;

    constructor(post: IPost) {
        this.id = post.id;
        this.title = post.title;
        this.description = post.description;
        this.geoURL = post.geoURL;
        this.author = post.author;
        this.difficultyLvl = post.difficultyLvl;
        this.photos = post.photos;
        this.duration = post.duration;
        this.status = post.status;
        this.comments = post.comments;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
    }
}
