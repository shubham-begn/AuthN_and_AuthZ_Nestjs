import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtservice:JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const email=username;
    const user = await this.usersService.getUser(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateToken(payload:User):string{
    return this.jwtservice.sign(payload);
  }
}