import { UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import BaseResolver from "src/core/resolvers/base-resolver";
import { GqlAuthGuard } from "../../auth/guards/gql-auth.guard";
import { Role } from "../entities/roles";
import { RolesService } from "../services/roles.service";

const {ResolverQuery, ResolverMutation} = BaseResolver(Role);

@Resolver()
// @UseGuards(GqlAuthGuard)
export class RolesQueryResolver extends ResolverQuery<Role> {
    constructor(serivce: RolesService) { 
        super(serivce);
    }
}

@Resolver()
// @UseGuards(GqlAuthGuard)
export class RolesMutationResolver extends ResolverMutation<Role> {
    constructor(serivce: RolesService) { 
        super(serivce);
    }
}