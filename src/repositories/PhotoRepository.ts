import fs from "fs";
import path from "path";
import { IPhoto } from "../interfaces/photo.interface";

const filePath = path.join(__dirname, "../data/photos.json");

export class PhotoRepository {
    static getAll(): IPhoto[] {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveAll(photos: IPhoto[]): void {
        fs.writeFileSync(filePath, JSON.stringify(photos, null, 2));
    }

    static findById(id: string): IPhoto | null {
        return this.getAll().find((p) => p.id === id) ?? null;
    }

    static findByPostId(id: string): IPhoto[] {
        return this.getAll().filter((photo) => id.includes(photo.postId));
    }

    static deleteWherePostId(id: string): void {
        const photos = this.getAll();
        const newPhotos = photos.filter((photo) => photo.postId !== id);
        this.saveAll(newPhotos);
    }

    static delete(id: string): void {
        const photos = this.getAll();
        const newPhotos = photos.filter((photo) => photo.id !== id);
        this.saveAll(newPhotos);
    }
}
