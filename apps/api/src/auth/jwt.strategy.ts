import AdminsService from '@admins/admins.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwtConstants from '@utils/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
