import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'cars' })
@ObjectType()
export class Car extends BaseModelEntity {
    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    alias: string
}