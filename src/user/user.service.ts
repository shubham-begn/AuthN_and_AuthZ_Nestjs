import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDto } from './dto/base.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async register(createUserDto:CreateUserDto):Promise<void>{

        const user=new User();
        user.full_name=createUserDto.full_name;
        user.email=createUserDto.email;
        user.password=createUserDto.password;
        user.role=createUserDto.role;
        await this.userRepository.save(user);
    }

    async getUser(email:string):Promise<User>{
        
        const user=await this.userRepository.findOneBy({email});
        return user;
    }
}
