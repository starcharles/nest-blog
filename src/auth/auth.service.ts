import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { SigninDto } from "./dto/signin.dto";
import { User } from "./user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {
    }
    async signUp(dto: CreateUserDto): Promise<User>{
        return await this.userRepository.createUser(dto)
    }

    async signIn(dto: SigninDto): Promise<{accessToken: string}> {
        const {email, password} = dto;
        const user = await User.findOne({email});
        if(!await user.validatePassword(password)) {
            throw new UnauthorizedException()
        }

        const payload = {
            name: user.name,
            email,
        }
        const accessToken = this.jwtService.sign(payload);
        return {accessToken}
    }
}
