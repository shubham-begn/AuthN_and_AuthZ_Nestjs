import { Injectable } from "@nestjs/common";
import { IsNotEmpty,IsString,IsEmail,MinLength } from "class-validator";
import { BaseDto } from "./base.dto";

@Injectable()
export class CreateUserDto extends BaseDto{

    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;
}