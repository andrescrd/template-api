import { Field, ObjectType } from "@nestjs/graphql";
import { Inputs } from "src/core/decorators/input.decorator";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity } from "typeorm";
import { CarInput } from "../dtos/create-car.input";

@Entity({ name: 'cars' })
@ObjectType()
@Inputs(CarInput)
export class Car extends BaseModelEntity {
    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    alias: string
}