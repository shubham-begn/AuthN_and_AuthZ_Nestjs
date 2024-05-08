import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authservice:AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  getHello(@Request() req): string {

    const token=this.authservice.generateToken(req.user);
    return token;
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'),new RoleGuard('user'))

  getAdminData():string
  {
   return "Admin Data";
  }
}
