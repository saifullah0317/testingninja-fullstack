/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Model, ObjectId } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';;
import { QuestionPool } from 'src/Schemas/questionPool.schema';
import { QuestionPoolDto } from './questionpool.dto';

@Injectable()
export class QuestionPoolService {
  constructor(@InjectModel(QuestionPool.name) private questionPoolModel: Model<QuestionPool>) {}

  async getbyuserid(userid:string):Promise<QuestionPool[]>{
    return await this.questionPoolModel.find({userid}).exec();
  }

  async addlist(newlist:QuestionPoolDto):Promise<QuestionPool>{
    const createdlist=new this.questionPoolModel(newlist);
    return createdlist.save();
  }
}
