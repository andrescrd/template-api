
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base-service";
import { CarInput } from "./dto/car.input";
import { Car } from "./entities/cars";

const DataService  = BaseService(Car);

@Injectable()
export class CarsService extends DataService {  
    
}