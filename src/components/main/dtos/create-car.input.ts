import { Field, InputType } from "@nestjs/graphql";
import { Length, Max, MinLength } from "class-validator";
import { BaseModelInput } from "src/core/models/base-model-input";

@InputType()
export class CarInput extends BaseModelInput {
    @Field()    
    @MinLength(5)
    name: string

    @Field({nullable: true})
    alias: string
}