/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class QuestionPool {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userid:User;

    @Prop()
    prompt:string;

    @Prop()
    mcqs: number;

    @Prop()
    questions: number;
}

export const QuestionPoolSchema = SchemaFactory.createForClass(QuestionPool);

export interface QuestionPoolInterface extends mongoose.Document{
  _id:string,
  userid:string,
  prompt:string,
  mcqs:number,
  questions:number
}