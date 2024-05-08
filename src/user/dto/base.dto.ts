import { Injectable } from "@nestjs/common";
import { IsString,IsNotEmpty,MinLength,IsEmail} from "class-validator";
@Injectable()
export class BaseDto{


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}