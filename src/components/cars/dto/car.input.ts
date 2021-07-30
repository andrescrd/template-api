import { Field, InputType } from "@nestjs/graphql";
import { Length, Max, MinLength } from "class-validator";

@InputType()
export class CarInput {
    @Field()    
    @MinLength(5)
    name: string

    @Field({nullable: true})
    alias: string
}