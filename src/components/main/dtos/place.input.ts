import { Field, InputType } from "@nestjs/graphql";
import { IsLatitude, IsLongitude, IsPhoneNumber, IsPositive, MinLength } from "class-validator";
import { BaseModelInput } from "src/core/models/base-model-input";

@InputType()
export class PlaceInput extends BaseModelInput {
    @Field()
    @MinLength(5)
    name: string

    @Field()
    @MinLength(5)
    address: string

    @Field()
    @IsPhoneNumber()
    phone: string

    @Field()
    @IsPositive()
    maxQuantity: number

    @Field()
    @IsPositive()
    quantity: number

    @Field()
    @IsLongitude()
    long: string

    @Field()
    @IsLatitude()
    lat: string

    @Field()    
    userId: string;
}