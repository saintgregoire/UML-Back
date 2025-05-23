import { Request, Response } from "express";
import { PostDTO } from "../dto/PostDTO";
import { PostRepository } from "../repositories/PostRepository";

export class PostController {
    getAll(req: Request, res: Response): void {
        const posts = PostRepository.getAll().map((post) => new PostDTO(post));
        res.json(posts);
    }

    create(req: Request, res: Response): void {
        const newPost = PostRepository.create(req.body);
        res.status(201).json(new PostDTO(newPost));
    }

    getOne(req: Request, res: Response): void {
        try {
            const post = PostRepository.findById(req.params.id);
            if (!post) {
                res.status(404).send("Post not found");
                return;
            }
            res.json(new PostDTO(post));
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    delete(req: Request, res: Response): void {
        PostRepository.delete(req.body.id);
        res.send("Post deleted successfully");
    }

    modify(req: Request, res: Response): void {
        try {
            PostRepository.modify(req.body);
            res.send("Post modified successfully");
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }
}
