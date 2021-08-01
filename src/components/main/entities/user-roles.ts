import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModelEntity } from "src/core/models/base-model-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "./roles";
import { User } from "./users";

@Entity('user_roles')
@ObjectType()
export class UserRole extends BaseModelEntity {

    @Column()
    @Field()
    userId: string;

    @Column()
    @Field()
    roleId: string;

    @ManyToOne(() => User, u => u.userRoles, { lazy: true })
    @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
    @Field(() => User, { nullable: true })
    user?: Promise<User>;
   
    @ManyToOne(() => Role, u => u.userRoles, { lazy: true })
    @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
    @Field(() => Role, { nullable: true })
    role?: Promise<Role>;
}
