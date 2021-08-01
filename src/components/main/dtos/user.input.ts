import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { BaseModelInput } from "src/core/models/base-model-input";

@InputType()
export class UserInput extends BaseModelInput {
    @Field()
    @IsEmail()
    userName: string;

    @Field()
    @MinLength(5)
    password: string;
}