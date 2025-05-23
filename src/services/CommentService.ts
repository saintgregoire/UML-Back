import { CommentDTO } from "../dto/CommentDTO";
import { IComment } from "../interfaces/comment.interface";
import { CommentRepository } from "../repositories/CommentRepository";

export class CommentService {
    getAllComments(): CommentDTO[] {
        return CommentRepository.getAll().map((comment) => new CommentDTO(comment));
    }

    createComment(data: Omit<IComment, "id">): void {
        CommentRepository.create(data);
    }

    getCommentById(id: string): CommentDTO {
        const comment = CommentRepository.findById(id);
        if (!comment) {
            throw new Error("Comment not found");
        }
        return new CommentDTO(comment);
    }

    deleteComment(id: string): void {
        CommentRepository.delete(id);
    }

    modifyComment(data: IComment): void {
        CommentRepository.modify(data);
    }
}