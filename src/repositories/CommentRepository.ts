import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../interfaces/comment.interface";

const filePath = path.join(__dirname, "../data/comments.json");

export class CommentRepository {
    static getAll(): IComment[] {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveAll(comments: IComment[]): void {
        fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
    }

    static create(comment: Omit<IComment, "id">): IComment {
        const comments = this.getAll();
        const newComment: IComment = { id: uuidv4(), ...comment };
        comments.push(newComment);
        this.saveAll(comments);
        return newComment;
    }

    static findById(id: string): IComment | null {
        return this.getAll().find((c) => c.id === id) ?? null;
    }

    static findByPostId(id: string): IComment[] {
        return this.getAll().filter(comment => id.includes(comment.postId));
    }

    static delete(id: string): void {
        const comments = this.getAll();
        const newComments = comments.filter(comment => comment.id !== id);
        this.saveAll(newComments);
    }

    static modify(comment: IComment): void {
        const comments = this.getAll();
        const index = comments.findIndex(c => c.id === comment.id);
        if(index === -1) {
            throw new Error('Cannot be modified');
        }

        comments[index] = comment;
        this.saveAll(comments);
    }
} 