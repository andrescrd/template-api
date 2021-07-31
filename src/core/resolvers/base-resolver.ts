import { BaseModelEntity } from "../models/base-model-entity";
import { getInputClass, getModelName } from "../utils/model.utils";
import { BaseResolverMutation } from "./base-resolver-mutation";
import { BaseResolverQuery } from "./base-resolver-query";

type Constructor<I> = new (...args: any[]) => I;

export function BaseResolver<T extends BaseModelEntity>(entity: Constructor<T>, 
    options: { queryWithDeleted?: boolean, withMutation: boolean } = { queryWithDeleted: true, withMutation: true }) {

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

    return { ResolverQuery }
}