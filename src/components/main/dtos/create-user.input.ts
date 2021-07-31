import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    userName: string;

    @Field()
    @MinLength(5)
    password: string;
}