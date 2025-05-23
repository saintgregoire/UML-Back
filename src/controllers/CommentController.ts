import { Request, Response } from "express";
import { CommentService } from "../services/CommentService";

export class CommentController {
    private commentService = new CommentService();

    getAll(req: Request, res: Response): void {
        const comments = this.commentService.getAllComments();
        res.json(comments);
    }

    create(req: Request, res: Response): void {
        this.commentService.createComment(req.body);
        res.status(201).send("Comment created successfully");
    }

    getOne(req: Request, res: Response): void {
        try {
            const comment = this.commentService.getCommentById(req.params.id);
            res.json(comment);
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    delete(req: Request, res: Response): void {
        this.commentService.deleteComment(req.body.id);
        res.send("Comment deleted successfully");
    }

    modify(req: Request, res: Response): void {
        this.commentService.modifyComment(req.body);
        res.send("Comment modified successfully");
    }
} 