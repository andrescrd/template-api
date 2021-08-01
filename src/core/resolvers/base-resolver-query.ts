import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/components/auth/guards/gql-auth.guard";
import { NoneAuthGuard } from "src/components/auth/guards/none-auth.guards";
import { BaseModelEntity } from "../models/base-model-entity";
import { IDataService } from "../services/data-service.interface";
import { Constructor } from "../types/constructor-type";
import { getModelName } from "../utils/model.utils";

export function BaseResolverQuery<T extends BaseModelEntity>(entity: Constructor<T>, withDeleted = true, useAuthGuard = true) {

    const modelName = getModelName(entity);
    const authGuard = useAuthGuard ? GqlAuthGuard : NoneAuthGuard;

    @Resolver({ isAbstract: true })
    abstract class BaseResolverQueryClass<T> {

        constructor(protected service: IDataService<T>) { }

        @Query(() => [entity], { name: `${modelName}List` })
        @UseGuards(authGuard)
        public async List(@Args('withDeleted', { nullable: true, defaultValue: withDeleted }) withDeleted: boolean) {
            return await this.service.getAll(withDeleted).catch(err => { throw err });
        }

        @Query(() => entity, { name: `${modelName}ById` })
        @UseGuards(authGuard)
        public async Single(@Args('id') id: string) {
            return await this.service.getOne(id).catch(err => { throw err });
        }
    }

    return BaseResolverQueryClass;
}

