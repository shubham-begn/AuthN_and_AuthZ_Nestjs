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

    async register(createUserDto: CreateUserDto): Promise<User> {
        // Create a new user entity
        const newUser = new User();
        newUser.full_name = createUserDto.firstname + ' ' + createUserDto.lastname;
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password;
        newUser.role = createUserDto.role;

        // Save the user to the database
        const savedUser = await this.userRepository.save(newUser);

        return savedUser;
    }

    async getUser(email:string):Promise<User>{
        
        const user=await this.userRepository.findOneBy({email});
        return user;
    }
}
