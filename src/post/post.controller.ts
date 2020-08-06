import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Put,
    UsePipes, ValidationPipe, UseGuards
} from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";
import { User, UserRole } from "../auth/user.entity";
import { GetUser } from "../shared/decorators/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../shared/decorators/roles.decorator";
import { Post as UserPost } from "./post.entity";

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {
    }

    @Get()
    async getAllPosts(): Promise<UserPost[]> {
        return await this.postService.getAll()
    }

    @Get(':id')
    async getPostById(@Param('id', ParseIntPipe) id: number) {
        return await this.postService.getPostById(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles(UserRole.ADMIN)
    @UsePipes(ValidationPipe)
    async createPost(
        @Body() createPostDto: CreatePostDto,
        @GetUser() user: User
    ) {
        return await this.postService.createPost(createPostDto, user);
    }

    @Put()
    @Roles(UserRole.ADMIN)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    updatePost() {
    }

    @Delete()
    @Roles(UserRole.ADMIN)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    deletePost() {
    }

    @Get(':id/comments')
    getAllComments(@Param('id', ParseIntPipe) id: number) {
    }

    @Post(':id/comments')
    createComment(@Param('id', ParseIntPipe) id: number) {
    }

    @Get(':id/likes')
    getFavs(@Param('id', ParseIntPipe) id: number) {
    }

    @Post(':id/likes')
    createFav(@Param('id', ParseIntPipe) id: number) {
    }
}
