/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  active: boolean;  

  @Prop({required:false})
  verificationCode: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserInterface extends mongoose.Document{
  _id:string,
  username:string,
  email:string,
  password:string,
  active:boolean,
  verificationCode:string
}