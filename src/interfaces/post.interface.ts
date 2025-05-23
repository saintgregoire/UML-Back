import { IUser } from "./user.interface";

export interface IPost {
    id: string;
    title: string;
    description: string;
    geoURL: string;
    author: string;
    difficultyLvl: number;
    duration: number;
    status: "pending" | "canceled" | "valid";
    createdAt: Date;
    updatedAt: Date;
}
