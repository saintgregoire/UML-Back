import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
    getAll(res: Response): void {
        userService.getAllUsers();
        res.status(200);
    }

    create(req: Request, res: Response): void {
        const { firstName, lastName, email, role } = req.body;
        if (!firstName || !lastName || !email) {
            res.status(400).json({ error: "Missing data" });
            return;
        }

        const defaultRole = role ?? 'user';

        const user = userService.createUser({ firstName, lastName, email, role: defaultRole });
        res.status(201).json(user);
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
}
