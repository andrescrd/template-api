import { Query, Resolver } from '@nestjs/graphql';
import BaseResolver from 'src/core/resolvers/base-resolver';
import { User } from './entities/users';
import { UsersService } from './users.service';

const { ResolverQuery, ResolverMutation } = BaseResolver(User);

@Resolver()
export class UsersQueryResolver extends ResolverQuery<User> {
    constructor(protected userService: UsersService) {
        super(userService);
    }
}
@Resolver()
export class UsersMutationResolver extends ResolverMutation<User> {
    constructor(protected userService: UsersService) {
        super(userService);
    }    
}
