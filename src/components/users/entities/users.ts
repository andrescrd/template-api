import { Field, ObjectType } from "@nestjs/graphql";
import { Inputs } from "src/core/decorators/input.decorator";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity } from "typeorm";
import { CreateUserInput } from "../dto/create-user.input";

@Entity('users')
@ObjectType()
@Inputs(CreateUserInput)
export class User extends BaseModelEntity {  

    @Column({ unique: true })
    @Field()
    userName: string;

    @Column()
    hash: string;    
}
