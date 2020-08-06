import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { TagModule } from "./tag/tag.module";
import { typeormConfig } from "./config/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        AuthModule,
        PostModule,
        TagModule,
        TypeOrmModule.forRoot(typeormConfig),
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
