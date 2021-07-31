import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { BaseModelInput } from "src/core/models/base-model-input";

@InputType()
export class RoleInput extends BaseModelInput {
    @Field()
    @MinLength(3)
    name: string

    @Field()
    @MinLength(3)
    display: string
}