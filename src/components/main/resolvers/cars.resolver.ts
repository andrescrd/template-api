import { UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import BaseResolver from "src/core/resolvers/base-resolver";
// import { GqlAuthGuard } from "../../auth/guards/gql-auth.guard";
import { CarsService } from "../services/cars.service";
import { Car } from "../entities/cars";
import { CarInput } from "../dtos/car.input";

const {ResolverQuery, ResolverMutation} = BaseResolver(Car, CarInput);

@Resolver()
// @UseGuards(GqlAuthGuard)
export class CarsQueryResolver extends ResolverQuery<Car> {
    constructor(carsService: CarsService) { 
        super(carsService);
    }
}

@Resolver()
// @UseGuards(GqlAuthGuard)
export class CarsMutationResolver extends ResolverMutation<Car, CarInput> {
    constructor(carsService: CarsService) { 
        super(carsService);
    }
}