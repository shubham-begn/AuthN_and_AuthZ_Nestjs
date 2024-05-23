import { Controller, Get ,ValidationPipe,Body, Post, Req,Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { BaseDto } from './dto/base.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
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

     @Post('google-register')
      async googleRegister(@Req() req):Promise<string>{

        
        console.log(req.body);
        const newUser = await this.userservice.register(req.body);
        const token = this.authService.generateToken(newUser);

        return token;
        
     }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any, @Res() res: any) { 
        const token = this.authService.generateToken(req.user);
        res.cookie('token', token, { httpOnly: false }); 

        return res.json({
        message:"User Logged in",
        cookie:token
       });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('dashboard')
     dashboard(@Req() req: any) {
        const cookies = req.cookies;
        console.log(cookies);
        
        const user = req.user;
        return { user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    logout(@Req() req,@Res() res){

        const cookies = req.cookies;
        if(cookies){
            res.clearCookie('token');
        }
        res.json({
            msg:"logged out successfully"
        })
    }
}
