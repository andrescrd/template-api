import { BaseModelEntity } from "../models/base-model-entity";
import { BaseModelInput } from "../models/base-model-input";
import { Constructor } from "../types/constructor-type";
import { BaseResolverMutation } from "./base-resolver-mutation";
import { BaseResolverQuery } from "./base-resolver-query";

const DEFAULT_OPTIONS = { queryWithDeleted: true, useAuthGuard: { query: true, mutation: true } };

export default function BaseResolver<T extends BaseModelEntity, I extends BaseModelInput>(entity: Constructor<T>,
    inputClass: Constructor<I> = null,
    options: { queryWithDeleted?: boolean, useAuthGuard: { query?: boolean, mutation?: boolean } } = DEFAULT_OPTIONS) {

    const ResolverQuery = BaseResolverQuery(
        entity,
        options.queryWithDeleted ?? DEFAULT_OPTIONS.queryWithDeleted,
        (options.useAuthGuard && options.useAuthGuard.query) ?? DEFAULT_OPTIONS.useAuthGuard.query
    );

    if (inputClass) {
        const ResolverMutation = BaseResolverMutation(
            entity,
            inputClass,
            (options.useAuthGuard && options.useAuthGuard.mutation) ?? DEFAULT_OPTIONS.useAuthGuard.mutation
        );
        
        return { ResolverQuery, ResolverMutation };
    }

    return { ResolverQuery };
}