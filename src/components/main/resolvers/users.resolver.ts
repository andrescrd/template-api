import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/components/auth/guards/gql-auth.guard';
import BaseResolver from 'src/core/resolvers/base-resolver';
import { CreateUserInput } from '../dtos/create-user.input';
import { User } from '../entities/users';
import { UsersService } from '../services/users.service';

const { ResolverQuery, ResolverMutation } = BaseResolver(User);

@Resolver()
@UseGuards(GqlAuthGuard)
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

    @Mutation(() => User)
    async userRegister(@Args('data') data: CreateUserInput) {
        const { userName, password } = data;
        const user = await this.userService.register(userName, password);
        return user;
    }
}
