/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from "class-validator"
// import { PartialType } from "@nestjs/swagger";

export class QuestionPoolDto{
    @IsString()
    prompt:string;
    
    @IsNumber()
    mcqs:number;
    
    @IsNumber()
    questions:number;
}