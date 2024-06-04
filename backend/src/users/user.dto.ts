/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from "class-validator"

export class UserDto{
    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}

export class SignupDto{
    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsString()
    verificationCode:string;
}