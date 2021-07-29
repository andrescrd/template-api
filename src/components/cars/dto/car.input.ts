import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CarInput {
    @Field()
    name: string

    @Field()
    alias: string

}