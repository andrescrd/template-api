import { BaseModelEntity } from "../models/base-model-entity";
import { Constructor } from "../types/constructor-type";
import { getInputClass, getModelName } from "../utils/model.utils";
import { BaseResolverMutation } from "./base-resolver-mutation";
import { BaseResolverQuery } from "./base-resolver-query";

const DEFAULT_OPTIONS = { queryWithDeleted: true, withMutation: true };

export default function BaseResolver<T extends BaseModelEntity>(entity: Constructor<T>,
    options: { queryWithDeleted?: boolean, withMutation: boolean } = DEFAULT_OPTIONS) {

    const { queryWithDeleted, withMutation } = options;
    const inputClass = getInputClass(entity);
    const modelName = getModelName(entity);

    const ResolverQuery = BaseResolverQuery(entity, queryWithDeleted);

    if (withMutation) {
        if (!inputClass) {
            console.error("\x1b[31m", `${Date.now()}  - ERROR - DEFINE INPUT CLASS FOR ${modelName.toUpperCase()}`);
        }

        const ResolverMutation = BaseResolverMutation(entity);

        return { ResolverQuery, ResolverMutation };
    }

    return { ResolverQuery };
}