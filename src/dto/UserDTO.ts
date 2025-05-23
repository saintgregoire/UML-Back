import { IUser } from "../interfaces/user.interface";

export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user";

    constructor(user: IUser) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
    }
}
