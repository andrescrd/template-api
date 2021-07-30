import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base-service';
import { User } from './entities/users';

const DataService  = BaseService(User);

@Injectable()
export class UsersService extends DataService {

    async getByUserName(userName: string) {
        const user = await this.repository.findOne({ userName: userName });
        
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
