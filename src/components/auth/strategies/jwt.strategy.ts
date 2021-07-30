import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/components/users/users.service';
import { JWT_SECRET } from 'src/constants/constants';
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET
        });
    }

    async validate(payload: { userName: string, sub: string }) : Promise<any> {
        return this.userService.getByUserName(payload.userName);
    }
}