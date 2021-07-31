import { Query, Resolver } from '@nestjs/graphql';
import BaseResolver from 'src/core/resolvers/base-resolver';
import { User } from './entities/users';
import { UsersService } from './users.service';

const { ResolverQuery } = BaseResolver(User);

@Resolver()
export class UsersResolver extends ResolverQuery<User> {
    constructor(protected userService: UsersService) {
        super(userService);
    }
}
