import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { group } from 'console';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      groupId: payload.groupId,
    };
  }
}
