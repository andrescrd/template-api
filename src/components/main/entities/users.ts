import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Place } from "./places";
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

    @OneToMany(() => Place, u => u.user, { lazy: true })
    @Field(() => [Place], { nullable: true })
    places?: [Place];
}
