import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';

const router = Router();
const controller = new CommentController();

router.post('/comments', controller.create.bind(controller)); 
router.post('/delete-comment', controller.delete.bind(controller));

export default router;