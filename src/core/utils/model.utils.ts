import { singular } from "pluralize";
import { BaseModelEntity } from "../models/base-model-entity";

export const getModelName = (baseModelType: typeof BaseModelEntity) => {
    return singular(
        baseModelType.name[0].toLowerCase() + baseModelType.name.slice(1)
    );
}