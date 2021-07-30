import { Module } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [CarsModule, AuthModule, UsersModule]
})
export class ComponentsModule {

}