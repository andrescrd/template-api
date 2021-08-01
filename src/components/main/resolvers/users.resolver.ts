import { Args, Mutation, Resolver } from '@nestjs/graphql';
import BaseResolver from 'src/core/resolvers/base-resolver';
import { UserInput } from '../dtos/user.input';
import { User } from '../entities/users';
import { UsersService } from '../services/users.service';

const { ResolverQuery, ResolverMutation } = BaseResolver(User, UserInput);

@Resolver()
export class UsersQueryResolver extends ResolverQuery<User> {
    constructor(protected userService: UsersService) {
        super(userService);
    }
}

@Resolver()
export class UsersMutationResolver extends ResolverMutation<User, UserInput> {
    constructor(protected userService: UsersService) {
        super(userService);
    }

    @Mutation(() => User)
    async userRegister(@Args('data') data: UserInput) {
        const { userName, password } = data;
        const user = await this.userService.register(userName, password);
        return user;
    }
}
