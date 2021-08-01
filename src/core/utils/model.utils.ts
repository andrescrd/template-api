import { singular } from "pluralize";
import { BaseModelEntity } from "../models/base-model-entity";
import { BaseModelInput } from "../models/base-model-input";

export const getModelName = (baseModelType: typeof BaseModelEntity) => {
    return singular(
        baseModelType.name[0].toLowerCase() + baseModelType.name.slice(1)
    );
}