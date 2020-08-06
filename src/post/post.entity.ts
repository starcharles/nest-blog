import {
    BaseEntity,
    Column, Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../auth/user.entity";
import { Tag } from "../tag/tag.entity";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @ManyToMany(type => Tag, tag => tag.posts)
    tags: Tag[]
}

