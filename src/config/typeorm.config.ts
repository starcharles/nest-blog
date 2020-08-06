import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 33060,
    username: 'root',
    password: 'root',
    database: 'nest_blog',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}
