import { Router } from "express";
import { UserController } from "../controllers/UserController";


const router = Router();
const controller = new UserController();

router.get('/get-all', controller.getAll.bind(controller));
router.post('/create', controller.create.bind(controller));
router.get('/get-user/:id', controller.getOne.bind(controller));
router.post('/delete-user', controller.delete.bind(controller));
router.post('/modify', controller.modify.bind(controller));
router.post('/login', controller.login.bind(controller));

export default router;