import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Post } from "../post/post.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role?: UserRole

    @OneToMany(type => Post, post => post.user)
    posts: Post[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password,this.salt);
        return this.password === hash
    }
}

export enum UserRole {
    ADMIN = 'admin',
}
