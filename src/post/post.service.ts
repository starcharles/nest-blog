import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./post.entity";
import { PostRepository } from "./post.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";

@Injectable()
export class PostService {
   constructor(
       @InjectRepository(PostRepository)
       private postRepository: PostRepository
   ) {
   }
   async getAll(): Promise<Post[]>{
      return await this.postRepository.getAll();
   }

   async getPostById(id: number): Promise<Post>{
      return await this.postRepository.getPostById(id);
   }

   async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
      return await this.postRepository.createPost(createPostDto, user)
   }
}
