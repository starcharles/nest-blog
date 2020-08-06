import { Controller, Delete, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
export class TagController {
    @Get()
    getAllTags() {

    }

    @Post()
    createTag() {

    }

    @Delete(':id')
    deleteTag() {

    }
}
