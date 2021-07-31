import { BaseModelInput } from "../models/base-model-input";

const INPUT_NAME = "Input";

export const Inputs = (inputType: typeof BaseModelInput) => {
    return function (target: Function) {
        const superClass = Object.getPrototypeOf(target);
        Reflect.defineMetadata(INPUT_NAME, inputType, superClass);
    };
};

