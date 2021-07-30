import { Module } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CarsModule, AuthModule]
})
export class ComponentsModule {

}