import { Controller, Get ,ValidationPipe,Body, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { BaseDto } from './dto/base.dto';
import { User } from './entities/user.entity';
@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}

    @Post()
     async Register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<string> {
      
        await this.userservice.register(createUserDto);
        return  "User Created";
    }
  

}
