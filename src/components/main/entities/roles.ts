import { Field, ObjectType } from "@nestjs/graphql";
import { Inputs } from "src/core/decorators/input.decorator";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity } from "typeorm";
import { RoleInput } from "../dtos/create-role.input";

@Entity('roles')
@ObjectType()
@Inputs(RoleInput)
export class Role extends BaseModelEntity {

    @Column({ unique: true })
    @Field()
    name: string;

    @Column()
    @Field()
    display: string;
}
