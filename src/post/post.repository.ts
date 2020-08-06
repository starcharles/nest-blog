import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./post.entity";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../auth/user.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
    async getAll(): Promise<Post[]> {
        return await Post.find({});
    }

    async getPostById(id: number): Promise<Post> {
        return await Post.findOne(id);
    }
    async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
        const { title, text} = createPostDto
        const post = new Post();
        post.title = title;
        post.text = text;
        post.user = user;
        await post.save()
        delete post.user;
        return post;
    }
}
