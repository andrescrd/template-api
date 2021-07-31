import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base-service';
import { User } from '../entities/users';
import { hash } from 'bcryptjs';

const DataService = BaseService(User);

@Injectable()
export class UsersService extends DataService {

    async getByUserName(userName: string) {
        const user = await this.repository.findOne({ userName: userName });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async register(userName: string, password: string) {
        const user = await this.repository.findOne({ userName: userName });

        if (user) {
            throw new BadRequestException("User already exist");
        }

        const hashedPassword = await hash(password, 13);

        const newUser = {
            userName: userName,
            hash: hashedPassword
        }
        const result = await this.repository.save(newUser);

        return result;
    }
}
