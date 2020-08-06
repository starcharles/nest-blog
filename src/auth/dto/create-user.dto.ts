import { UserRole } from "../user.entity";
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserRole)
    role: UserRole
}
