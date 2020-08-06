import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body()createUserDto: CreateUserDto
    ): Promise<User> {
        return await this.authService.signUp(createUserDto);
    }

    @Post('signin')
    async signIn(@Body() signinDto: SigninDto): Promise<{accessToken: string}> {
        return await this.authService.signIn(signinDto)
    }
}
