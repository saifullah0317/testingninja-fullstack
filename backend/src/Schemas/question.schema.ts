/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Test } from './test.schema';
// import { QuestionPool } from './questionPool.schema';

@Schema()
export class Question {
    @Prop()
    question: string;

    @Prop({required:false})
    startRange: number;

    @Prop({required:false})
    endRange: number;

    @Prop({required:false})
    allowMultChoice: boolean;

    @Prop({required:false})
    options:string[];
    
    @Prop({required:false})
    mcqOption:string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export interface QuestionInterface extends mongoose.Document{
  _id:string,
  question:string,
  startRange?:number,
  allowMultChoice?:boolean,
  endRange?:number,
  options?:string[],
  mcqOption?:string
}