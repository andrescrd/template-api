import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/components/auth/guards/gql-auth.guard";
import { NoneAuthGuard } from "src/components/auth/guards/none-auth.guards";
import { DeepPartial } from "typeorm";
import { BaseModelEntity } from "../models/base-model-entity";
import { BaseModelInput } from "../models/base-model-input";
import { IDataService } from "../services/data-service.interface";
import { Constructor } from "../types/constructor-type";
import { getModelName } from "../utils/model.utils";

export function BaseResolverMutation<T extends BaseModelEntity, I extends BaseModelInput>(entity: Constructor<T>, inputClass: Constructor<I>, useAuthGuard = true) {

    const modelName = getModelName(entity);
    const authGuard = useAuthGuard ? GqlAuthGuard : NoneAuthGuard;

    @Resolver({ isAbstract: true })
    abstract class BaseResolverMutationClass<T, I> {

        constructor(protected service: IDataService<T>) { }

        @Mutation(() => entity, { name: `${modelName}Create` })
        @UseGuards(authGuard)
        public async Create(@Args('data', { type: () => inputClass }) data: DeepPartial<I>): Promise<T> {
            const toSave = Object.assign(new entity(), data) as DeepPartial<T>;
            return await this.service.create(toSave).catch(err => { throw err });
        }

        @Mutation(() => entity, { name: `${modelName}Update` })
        @UseGuards(authGuard)
        public async Update(@Args('id') id: string, @Args('data', { type: () => inputClass }) data: DeepPartial<I>): Promise<T> {
            const toSave = Object.assign(new entity(), data) as DeepPartial<T>;
            return await this.service.update(id, toSave).catch(err => { throw err });
        }

        @Mutation(() => Boolean, { name: `${modelName}Delete` })
        @UseGuards(authGuard)
        public async Remove(@Args('id') id: string, @Args('isSoftDelete', { nullable: true, defaultValue: true }) isSoftDelete: boolean): Promise<Boolean> {
            return await this.service.delete(id, isSoftDelete).catch(err => { throw err });
        }
    }

    return BaseResolverMutationClass;
}

