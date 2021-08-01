import { Resolver } from "@nestjs/graphql";
import BaseResolver from "src/core/resolvers/base-resolver";
import { RoleInput } from "../dtos/role.input";
import { Role } from "../entities/roles";
import { RolesService } from "../services/roles.service";

const {ResolverQuery, ResolverMutation} = BaseResolver(Role, RoleInput);

@Resolver()
export class RolesQueryResolver extends ResolverQuery<Role> {
    constructor(serivce: RolesService) { 
        super(serivce);
    }
}

@Resolver()
export class RolesMutationResolver extends ResolverMutation<Role, RoleInput> {
    constructor(serivce: RolesService) { 
        super(serivce);
    }
}