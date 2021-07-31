import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType({ isAbstract: true })
export class BaseModelEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field()
    createdAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    @Field({ nullable: true })
    deletedAt: Date;
}


