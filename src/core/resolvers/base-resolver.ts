import { BaseModelEntity } from "../models/base-model-entity";
import { BaseModelInput } from "../models/base-model-input";
import { Constructor } from "../types/constructor-type";
import { getModelName } from "../utils/model.utils";
import { BaseResolverMutation } from "./base-resolver-mutation";
import { BaseResolverQuery } from "./base-resolver-query";

const DEFAULT_OPTIONS = { queryWithDeleted: true, withMutation: true };

export default function BaseResolver<T extends BaseModelEntity, I extends BaseModelInput>(entity: Constructor<T>,
    inputClass: Constructor<I> = null,
    options: { queryWithDeleted?: boolean } = DEFAULT_OPTIONS) {

    const { queryWithDeleted } = options;;

    const ResolverQuery = BaseResolverQuery(entity, queryWithDeleted);

    if (inputClass) {
        const ResolverMutation = BaseResolverMutation(entity, inputClass);
        return { ResolverQuery, ResolverMutation };      
    }

    return { ResolverQuery };
}