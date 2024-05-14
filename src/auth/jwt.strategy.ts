import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        
        // Extract token from cookies
        if (req && req.headers && req.headers.cookie) {
          const cookies = req.headers.cookie.split(';').map(cookie => cookie.trim());
          const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
          if (tokenCookie) {
            token = tokenCookie.split('=')[1];
          }
        }
        
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: "Secret",
    });
  }

  async validate(payload: any): Promise<any> {
    // Validate and return the user from the JWT payload
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
