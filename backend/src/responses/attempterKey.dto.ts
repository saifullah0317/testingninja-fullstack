/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from "class-validator"

export class AttempterKeyDto{
    @IsEmail()
    email:string;

    @IsString()
    key:string;

}