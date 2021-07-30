import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity } from "typeorm";

@Entity('users')
@ObjectType()
export class User extends BaseModelEntity {  

    @Column({ unique: true })
    @Field()
    userName: string;

    @Column()
    hash: string;    
}
