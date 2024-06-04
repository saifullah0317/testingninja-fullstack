/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userid: User;

  @Prop()
  category:string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export interface CategoryInterface extends mongoose.Document{
  _id:string,
  userid:string,
  category:string,
}