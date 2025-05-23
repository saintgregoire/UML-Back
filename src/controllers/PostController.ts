import { Request, Response } from "express";
import { PostService } from "../services/PostService";

export class PostController {
    getAll(res: Response): void {
        const posts = PostService.getAll();
        res.json(posts);
    }

    create(req: Request, res: Response): void {
        PostService.createPost(req.body);
        res.status(201).json({message: "Post created"});
    }

    getOne(req: Request, res: Response): void {
        try {
            const post = PostService.getOne(req.params.id);
            if (!post) {
                res.status(404).send("Post not found");
                return;
            }
            res.status(201);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    delete(req: Request, res: Response): void {
        PostService.deletePost(req.body.id);
        res.send("Post deleted successfully");
    }

    modify(req: Request, res: Response): void {
        try {
            PostService.updatePost(req.body);
            res.status(200).send("Post modified successfully");
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }
}
