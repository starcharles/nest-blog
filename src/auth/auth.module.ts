import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'},
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [
        ConfigService,
        AuthService,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [
        JwtStrategy,
        PassportModule,
    ]
})
export class AuthModule {
    constructor() {
    }
}
