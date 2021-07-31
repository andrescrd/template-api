import { Resolver } from "@nestjs/graphql";
import { BaseResolver } from "src/core/resolvers/base-resolver";
import { CarsService } from "./cars.service";
import { Car } from "./entities/cars";

const {ResolverQuery, ResolverMutation} = BaseResolver(Car);

@Resolver()
// @UseGuards(GqlAuthGuard)
export class CarsQueryResolver extends ResolverQuery<Car> {
    constructor(carsService: CarsService) { 
        super(carsService);
    }
}

@Resolver()
// @UseGuards(GqlAuthGuard)
export class CarsMutationResolver extends ResolverMutation<Car> {
    constructor(carsService: CarsService) { 
        super(carsService);
    }
}