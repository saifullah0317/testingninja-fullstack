/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Response } from './response.schema';

@Schema()
export class Result {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Response' })
    responseid: Response;

    @Prop()
    result: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);