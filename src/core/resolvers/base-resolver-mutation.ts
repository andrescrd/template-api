import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DeepPartial } from "typeorm";
import { BaseModelEntity } from "../models/base-model-entity";
import { IDataService } from "../services/data-service.interface";
import { getInputClass, getModelName } from "../utils/model.utils";

type Constructor<I> = new (...args: any[]) => I;

export function BaseResolverMutation<T extends BaseModelEntity>(entity: Constructor<T>) {

    const modelName = getModelName(entity);
    const inputClass = getInputClass(entity);

    @Resolver({ isAbstract: true })
    abstract class BaseResolverMutationClass<T> {

        constructor(private service: IDataService<T>) { }

        @Mutation(() => entity, { name: `${modelName}Create`})
        public async Create(@Args('data', { type: () => inputClass }) car: DeepPartial<T>): Promise<T> {
            return await this.service.create(car).catch(err => { throw err });
        }

        @Mutation(() => entity,  { name: `${modelName}Update` })
        public async Update(@Args('id') id: string, @Args('data', { type: () => inputClass }) data: DeepPartial<T>): Promise<T> {
            return await this.service.update(id, data).catch(err => { throw err });
        }

        @Mutation(() => Boolean, { name: `${modelName}Delete` })
        public async Remove(@Args('id') id: string, @Args('isSoftDelete', { nullable: true, defaultValue: true }) isSoftDelete: boolean): Promise<Boolean> {
            return await this.service.delete(id, isSoftDelete).catch(err => { throw err });
        }
    }

    return BaseResolverMutationClass;
}

