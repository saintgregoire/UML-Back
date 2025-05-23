import { UserDTO } from "../dto/UserDTO";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    getAllUsers(): UserDTO[] {
        return UserRepository.getAll().map((user) => new UserDTO(user));
    }

    createUser(data: Omit<IUser, "id">): void {
        UserRepository.create(data);
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
}
