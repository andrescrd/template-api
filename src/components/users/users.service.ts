import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    getSingle(id: string): Promise<User> {
        return this.userRepository.findOne(id).then((e => { throw new InternalServerErrorException() }));
    }

    getByUserName(userName: string) {
        return  this.userRepository.findOne({ userName: userName });
    }
}
