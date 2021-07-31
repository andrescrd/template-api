import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/cars';
import { User } from './entities/users';
import { CarsMutationResolver, CarsQueryResolver } from './resolvers/cars.resolver';
import { UsersMutationResolver, UsersQueryResolver } from './resolvers/users.resolver';
import { CarsService } from './services/cars.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        User, Car
    ])],
    exports: [
        UsersService
    ],
    providers: [
        UsersService,
        CarsService,
        UsersQueryResolver,
        UsersMutationResolver,
        CarsQueryResolver,
        CarsMutationResolver,
    ]

})
export class MainModule { }