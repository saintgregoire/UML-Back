import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
    getAll(res: Response): void {
        userService.getAllUsers();
        res.status(200);
    }

    async create(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: "Missing data" });
            return;
        }

        const defaultRole = role ?? 'user';

        await userService.createUser({ firstName, lastName, email, password, role: defaultRole });
        res.status(201).json({ message: "User created successfully" });
    }

    getOne(req: Request, res: Response): void {
        try {
            const id = req.params.id;
            const user = userService.getUserById(id);
            res.json(user);
        } catch (e: any) {
            res.status(404).json({ error: e.message });
        }
    }

    delete(req: Request, res: Response): void {
        const { id, role } = req.body;

        if(role !== 'admin'){
            res.status(401).json({error: 'Not Admin'})
        }

        userService.deleteUser(id);
        res.status(200);
    }

    modify(req: Request, res: Response): void {
        try{
            userService.modifyUser(req.body);
        }catch(e: any){
            res.status(400).json({error: e.message});
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isPasswordValid = await userService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        res.status(200).json({ message: "Login successful" });
    }
}
