/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Attempter } from './attempter.schema';

@Schema({timestamps:true})
export class AttempterList {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userid:User;

    @Prop()
    title:string;

    @Prop({required:false})
    description: string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Attempter'}]})
    attempters: Attempter[];
}

export const AttempterListSchema = SchemaFactory.createForClass(AttempterList);

export interface AttempterListInterface extends mongoose.Document{
  userid:string,
  title:string,
  description?:string,
  attempters:string[]
}

export interface AttempterListFrontendInterface extends mongoose.Document{
  title:string,
  description?:string,
  attempters:string[],
  createdAt:string
}