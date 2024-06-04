/* eslint-disable prettier/prettier */
import { IsString, ArrayMinSize } from "class-validator"
import { PartialType } from "@nestjs/swagger";

export class QuestionDto{
    @IsString()
    question:string;

    startRange?:number;

    endRange?:number;

    allowMultChoice?:boolean;

    options?:string[];

    mcqOption?:string;
}
// export class OtionalQuestionDto extends PartialType(QuestionDto) {}