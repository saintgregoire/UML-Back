import { PostDTO } from "../dto/PostDTO";
import { IPost } from "../interfaces/post.interface";
import { CommentRepository } from "../repositories/CommentRepository";
import { PhotoRepository } from "../repositories/PhotoRepository";
import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";


export class PostService {

    static getAll(): PostDTO[]{
        const posts = PostRepository.getAll();
        return posts.map(post => this.buildDTO(post));
    }

    static getOne(id: string): PostDTO {
        const post = PostRepository.findById(id);
        if(!post){
            throw new Error('Post not found');
        }

        return this.buildDTO(post);
    }

    static createPost(data: Omit<IPost, "id">): void {
        PostRepository.create(data);
    }

    static deletePost(id: string): void{
        PostRepository.delete(id);
    }

    static updatePost(post: IPost): PostDTO {
        PostRepository.modify(post);
        return this.buildDTO(post);
    }

    private static buildDTO(post: IPost): PostDTO {
        const author = UserRepository.findById(post.author);
        const photos = PhotoRepository.findByPostId(post.id);
        const comments = CommentRepository.findByPostId(post.id);

        if(!author || !photos || !comments){
            throw new Error('Cant to build Post DTO');
        }

        return new PostDTO(post, author, photos, comments);
    }
}