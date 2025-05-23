import { IComment } from "./comment.interface";
import { IPhoto } from "./photo.interface";
import { IUser } from "./user.interface";

export interface IPost {
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
}
