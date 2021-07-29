import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CarsService } from "./cars.service";
import { CarInput } from "./dto/car.input";
import { Car } from "./entities/cars";

@Resolver()
export class CarsResolver {
    constructor(private carsService: CarsService) { }

    @Query(() => [Car])
    public async cars(): Promise<Car[]> {
        return await this.carsService.getAllCars().catch(err => { throw err });
    }

    @Mutation(() => Car)
    public async addCar(@Args('data') car: CarInput): Promise<Car> {
        return await this.carsService.addNewCar(car).catch(err => { throw err });
    }
}