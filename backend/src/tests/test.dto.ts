/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsBoolean, IsDate, ArrayMinSize } from "class-validator"

export class TestDto{
    @IsString()
    categoryid:string; 

    questions:string[];

    @IsString()
    title:string;

    description?:string;

    @IsBoolean()
    isPost:boolean;

    allowAll?:boolean;

    attempterListid?:string[];

    time?:number;

    active:boolean;

    // expireat?:string;

    // activeOn?:string;

    instructions?:string[];
}