import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "./user-roles";

@Entity('roles')
@ObjectType()
export class Role extends BaseModelEntity {

    @Column({ unique: true })
    @Field()
    name: string;

    @Column()
    @Field()
    display: string;

    @OneToMany(() => UserRole, u => u.user, { lazy: true })
    @Field(() => [UserRole], { nullable: true })
    userRoles?: [UserRole];
}
