import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "./user-roles";

@Entity('users')
@ObjectType()
export class User extends BaseModelEntity {

    @Column({ unique: true })
    @Field()
    userName: string;

    @Column()
    hash: string;

    @OneToMany(() => UserRole, u => u.user, { lazy: true })
    @Field(() => [UserRole], { nullable: true })
    userRoles?: [UserRole];
}
