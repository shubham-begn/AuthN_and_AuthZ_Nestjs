import { Controller, Get ,ValidationPipe,Body, Post,Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { BaseDto } from './dto/base.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request ,Response} from '@nestjs/common';
import { CookieOptions } from 'express';
@Controller('user')
export class UserController {
    constructor(private userservice:UserService,
        private readonly authService:AuthService
    ){}

    @Post('register')
async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<string> {
    const validatedData = createUserDto;

    const newUser = await this.userservice.register(validatedData);

    const token = this.authService.generateToken(newUser);

    return token;
}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any, @Res() res: any) { 
        const token = this.authService.generateToken(req.user);
        res.cookie('token', token, { httpOnly: true }); 

        return res.json({
        message:"User Logged in",
        cookie:token
       });
    }

    @UseGuards(AuthGuard('jwt'),new RoleGuard('user'))
    @Post('dashboard')
    dashboard(){
        return "Dashboard";
    }

}
