/* eslint-disable prettier/prettier */
import { IsString } from "class-validator"

export class AttempterDto{
    @IsString()
    email:string;
}