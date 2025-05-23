import { Router } from "express";
import { PostController } from "../controllers/PostController";

const router = Router();
const controller = new PostController();

router.get('get-posts', controller.getAll.bind(controller));
router.post('/create', controller.create.bind(controller));
router.get('/get-post/:id', controller.getOne.bind(controller));
router.post('/delete-post', controller.delete.bind(controller));
router.post('modify-post', controller.modify.bind(controller));


export default router;