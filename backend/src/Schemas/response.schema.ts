/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Attempter } from './attempter.schema';
import { Question } from './question.schema';
import { Test } from './test.schema';

@Schema({ _id: false })
export class SingleResponse {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
    questionid: Question;

    @Prop()
    response: string;
}

export const SingleResponseSchema = SchemaFactory.createForClass(SingleResponse);

@Schema()
export class Response {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attempter' })
    attempterid: Attempter;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
    testid: Test;

    @Prop({ type: [SingleResponseSchema] })
    responses: SingleResponse[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);