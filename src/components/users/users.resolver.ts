import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/users';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {

    constructor(private userService: UsersService) { }

    @Query(() => [User])
    public async users(): Promise<User[]> {
        return await this.userService.getAll();
    }
}
