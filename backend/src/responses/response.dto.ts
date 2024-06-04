/* eslint-disable prettier/prettier */
import { IsString, IsArray } from "class-validator"

interface singleResponse {
    questionid:string,
    response:string
}

export class ResponseDto{
    @IsString()
    attempterid:string;

    @IsArray()
    responses:singleResponse[];
}