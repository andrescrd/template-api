
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarInput } from "./dto/car.input";
import { Car } from "./entities/cars";

@Injectable()
export class CarsService {
    constructor(@InjectRepository(Car) private carRepository: Repository<Car>) { }

    public async getAllCars(): Promise<Car[]> {
        return this.carRepository.find().catch(() => { throw new InternalServerErrorException() });
    }

    addNewCar(car: CarInput): Promise<Car> {
        const newCar = this.carRepository.create(car);
        return this.carRepository.save(newCar).catch(() => { throw new InternalServerErrorException() });
    }
}