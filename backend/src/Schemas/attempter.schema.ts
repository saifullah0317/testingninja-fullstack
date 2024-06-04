/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Attempter {
  @Prop({unique:true})
  email:string;
}

export const AttempterSchema = SchemaFactory.createForClass(Attempter);

export interface AttempterInterface extends mongoose.Document{
  _id: mongoose.Types.ObjectId,
  email:string,
}