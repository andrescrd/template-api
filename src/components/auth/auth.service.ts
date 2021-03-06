import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { JWT_SECRET } from 'src/constants/constants';
import { User } from '../main/entities/users';
import { UsersService } from '../main/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validate(userName: string, password: string): Promise<User> | null {
        try {
            const user = await this.userService.getByUserName(userName);

            if (!user) {
                return null;
            }

            const verify = await compare(password, user.hash);

            if (!verify) {
                return null;
            }

            return user;
        } catch (error) {
            return null;
        }
    }

    login(user: User): { accessToken: string } {
        const payload = {
            userName: user.userName,
            sub: user.id
        };

        return { accessToken: this.jwtService.sign(payload) }
    }

    async verify(token: string): Promise<User> {
        const decode = this.jwtService.verify(token, { secret: JWT_SECRET });
        var user = await this.userService.getByUserName(decode.userName);

        if (!!user) {
            throw new Error("Invalid token");
        }

        return user;
    }
}
