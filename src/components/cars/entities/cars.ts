import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('timestamp')
    @Field()
    createdAt: number; 

    @Column('timestamp')
    @Field()
    deletedAt: number; 
}