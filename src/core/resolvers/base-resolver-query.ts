import { Args, Query, Resolver } from "@nestjs/graphql";
import { BaseModelEntity } from "../models/base-model-entity";
import { IDataService } from "../services/data-service.interface";
import { Constructor } from "../types/constructor-type";
import { getModelName } from "../utils/model.utils";

export function BaseResolverQuery<T extends BaseModelEntity>(entity: Constructor<T>, withDeleted = true) {

    const modelName = getModelName(entity);

    @Resolver({ isAbstract: true })
    abstract class BaseResolverQueryClass<T> {
        constructor(private service: IDataService<T>) { }

        @Query(() => [entity], { name: `${modelName}List` })
        public async List(@Args('withDeleted', { nullable: true, defaultValue: withDeleted }) withDeleted: boolean) {
            return await this.service.getAll(withDeleted).catch(err => { throw err });
        }

        @Query(() => entity, { name: `${modelName}ById` })
        public async Single(@Args('id') id: string) {
            return await this.service.getOne(id).catch(err => { throw err });
        }
    }

    return BaseResolverQueryClass;
}

