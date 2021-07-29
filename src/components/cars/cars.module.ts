import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsResolver } from "./cars.resolver";
import { CarsService } from "./cars.service";
import { Car } from "./entities/cars";

@Module({
    imports: [TypeOrmModule.forFeature([Car])],
    exports: [CarsService],
    providers: [CarsService, CarsResolver]
})
export class CarsModule {

}
