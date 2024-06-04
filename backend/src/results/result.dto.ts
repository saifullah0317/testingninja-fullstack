/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from "class-validator"

export class ResultDto{
    @IsString()
    responseid:string;

    @IsNumber()
    result:number;
}