
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
}