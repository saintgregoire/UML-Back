import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../interfaces/user.interface";

const filePath = path.join(__dirname, "../data/users.json");

export class UserRepository {
    static getAll(): IUser[] {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }

    static saveAll(users: IUser[]): void {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    }

    static create(user: Omit<IUser, "id">): IUser {
        const users = this.getAll();
        const newUser: IUser = { id: uuidv4(), ...user };
        users.push(newUser);
        this.saveAll(users);
        return newUser;
    }

    static findById(id: string): IUser | null {
        return this.getAll().find((u) => u.id === id) ?? null;
    }

    static delete(id: string): void {
        const users = this.getAll();
        const newUsers = users.filter(user => user.id !== id);
        this.saveAll(newUsers);
    }

    static modify(user: IUser): void {
        const users = this.getAll();
        const index = users.findIndex(u => u.id === user.id);
        if(index === -1) {
            throw new Error('Cant to be modified');
        }

        users[index] = user;
        this.saveAll(users);
    }


    static findByEmail(email: string): IUser | null {
        return this.getAll().find((u) => u.email === email) ?? null;
    }
}
