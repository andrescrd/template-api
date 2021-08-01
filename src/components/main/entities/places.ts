import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./users";

@Entity({ name: 'places' })
@ObjectType()
export class Place extends BaseModelEntity {
    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    address: string

    @Column()
    @Field()
    phone: string

    @Column('int', { default: 0 })
    @Field()
    maxQuantity: number

    @Column('int', { default: 0 })
    @Field()
    quantity: number

    @Column()
    @Field()
    long: string

    @Column()
    @Field()
    lat: string

    @Column()
    @Field()
    userId: string;
    
    @ManyToOne(() => User, u => u.userRoles, { lazy: true })
    @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
    @Field(() => User, { nullable: true })
    user: User;
}