import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DeepPartial } from "typeorm";
import { BaseModelEntity } from "../models/base-model-entity";
import { BaseModelInput } from "../models/base-model-input";
import { IDataService } from "../services/data-service.interface";
import { Constructor } from "../types/constructor-type";
import { getModelName } from "../utils/model.utils";

export function BaseResolverMutation<T extends BaseModelEntity, I extends BaseModelInput>(entity: Constructor<T>, inputClass: Constructor<I>) {

    const modelName = getModelName(entity);
   

    @Resolver({ isAbstract: true })
    abstract class BaseResolverMutationClass<T,I> {

        constructor(private service: IDataService<T>) { }

        @Mutation(() => entity, { name: `${modelName}Create`})
        public async Create(@Args('data', { type: () => inputClass }) data: DeepPartial<I>): Promise<T> {
            const toSave = Object.assign(new entity(), data) as DeepPartial<T>;
            return await this.service.create(toSave).catch(err => { throw err });
        }

        @Mutation(() => entity,  { name: `${modelName}Update` })
        public async Update(@Args('id') id: string, @Args('data', { type: () => inputClass }) data: DeepPartial<I>): Promise<T> {
            const toSave = Object.assign(new entity(), data) as DeepPartial<T>;
            return await this.service.update(id, toSave).catch(err => { throw err });
        }

        @Mutation(() => Boolean, { name: `${modelName}Delete` })
        public async Remove(@Args('id') id: string, @Args('isSoftDelete', { nullable: true, defaultValue: true }) isSoftDelete: boolean): Promise<Boolean> {
            return await this.service.delete(id, isSoftDelete).catch(err => { throw err });
        }
    }

    return BaseResolverMutationClass;
}

