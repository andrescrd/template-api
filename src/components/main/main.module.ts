import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/cars';
import { Place } from './entities/places';
import { Role } from './entities/roles';
import { UserRole } from './entities/user-roles';
import { User } from './entities/users';
import { CarsMutationResolver, CarsQueryResolver } from './resolvers/cars.resolver';
import { PlacesMutationResolver, PlacesQueryResolver } from './resolvers/places.resolver';
import { RolesMutationResolver, RolesQueryResolver } from './resolvers/roles.resolver';
import { UsersMutationResolver, UsersQueryResolver } from './resolvers/users.resolver';
import { CarsService } from './services/cars.service';
import { PlacesService } from './services/places.service';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        User, Car, Role, UserRole, Place
    ])],
    exports: [
        UsersService
    ],
    providers: [
        UsersService,
        CarsService,
        RolesService,
        PlacesService,

        UsersQueryResolver,
        UsersMutationResolver,
        CarsQueryResolver,
        CarsMutationResolver,
        RolesQueryResolver,
        RolesMutationResolver,
        PlacesQueryResolver,
        PlacesMutationResolver
    ]

})
export class MainModule { }