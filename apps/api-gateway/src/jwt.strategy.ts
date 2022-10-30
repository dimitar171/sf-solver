import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private clientAuth: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'solverSecret1',
    });
  }
  async validate(payload: any) {
    const { username } = payload;
    const user = await lastValueFrom(
      this.clientAuth.send(
        {
          cmd: 'find-user',
        },
        username,
      ),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return username;
  }
}
