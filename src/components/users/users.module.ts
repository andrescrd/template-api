import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users';
import { UsersService } from './users.service';
import { UsersMutationResolver, UsersQueryResolver } from './users.resolver';

@Module({  
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, UsersQueryResolver, UsersMutationResolver]
})
export class UsersModule {}
