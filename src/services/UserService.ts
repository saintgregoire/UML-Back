import bcrypt from 'bcrypt';
import { UserDTO } from "../dto/UserDTO";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    getAllUsers(): UserDTO[] {
        return UserRepository.getAll().map((user) => new UserDTO(user));
    }

    async createUser(data: Omit<IUser, "id">): Promise<void> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        UserRepository.create({ ...data, password: hashedPassword });
    }

    getUserById(id: string): UserDTO {
        const user = UserRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return new UserDTO(user);
    }

    deleteUser(id: string): void {
        UserRepository.delete(id);
    }

    modifyUser(data: IUser): void {
        UserRepository.modify(data);
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }


    getUserByEmail(email: string): IUser | null {
        return UserRepository.findByEmail(email);
    }
}