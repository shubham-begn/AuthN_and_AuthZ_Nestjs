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

  generateToken(user: User): string {
    // Generate JWT token using user data
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtservice.sign(payload);
    return token;
}
}