import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cars'})
@ObjectType()
export class Car {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    name:  string

    @Column()
    @Field()
    alias: string

    @CreateDateColumn({type: 'timestamp'})
    @Field()
    createdAt: Date; 

    @CreateDateColumn({type: 'timestamp', nullable: true})
    @Field()
    deletedAt: Date | null; 
}