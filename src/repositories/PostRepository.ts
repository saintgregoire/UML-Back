import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { IPost } from "../interfaces/post.interface";

const filePath = path.join(__dirname, "../data/posts.json");

export class PostRepository {
    static getAll(): IPost[] {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveAll(posts: IPost[]): void {
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
    }

    static create(post: Omit<IPost, "id">): IPost {
        const posts = this.getAll();
        const newPost: IPost = { id: uuidv4(), ...post };
        posts.push(newPost);
        this.saveAll(posts);
        return newPost;
    }

    static delete(id: string): void {
        const posts = this.getAll();
        const newPosts = posts.filter((post) => post.id !== id);
        this.saveAll(newPosts);
    }

    static modify(post: IPost): void {
        const posts = this.getAll();
        const index = posts.findIndex((p) => p.id === post.id);
        if (index === -1) {
            throw new Error("Cant to be modified");
        }

        posts[index] = post;
        this.saveAll(posts);
    }

    static findById(id: string): IPost | null {
        return this.getAll().find((p) => p.id === id) ?? null;
    }
}
