import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column({ unique: true })
    @Field()
    userName: string;

    @Column()
    hash: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field()
    createdAt: Date;
}
