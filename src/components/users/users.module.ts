import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({  
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
