import { User } from "./user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { SigninDto } from "./dto/signin.dto";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(private jwtService: JwtService) {
        super();
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const {name, email, password, role} = dto;
        const user = new User();
        user.name = name;
        user.email = email;
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        user.salt = salt;
        user.password = passwordHash;
        user.role = role;
        const savedUser = await user.save();
        delete savedUser.password;
        delete savedUser.salt;
        return savedUser;
    }
}
