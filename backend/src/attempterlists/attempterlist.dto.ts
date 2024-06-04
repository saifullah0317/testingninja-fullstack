/* eslint-disable prettier/prettier */
import { IsString, ArrayMinSize } from "class-validator"
// import { PartialType } from "@nestjs/swagger";

export class AttempterListDto{
    @IsString()
    title:string;

    description?:string;

    @ArrayMinSize(1)
    attempters:string[];
}
// export class OtionalQuestionDto extends PartialType(AttempterListDto) {}