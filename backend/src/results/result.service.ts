/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/Schemas/result.schema';
import { ResultDto } from './result.dto';

@Injectable()
export class ResultService {
  constructor(@InjectModel(Result.name) private resultModel: Model<Result>) {}

  async get(id:string):Promise<Result[]>{
        return this.resultModel.find({responseid:id}).populate({
            path:'responseid',
            populate:[
                {
                    path:'attempterid',
                    model:'Attempter'
                },
                {
                path:'questionid',
                model:'Question',
                populate:{
                    path:'testid',
                    model:'Test',
                    populate:{
                        path:'userid',
                        model:'User'
                    }
                }
            }]
        })
  }

  async add(createquestionDto: ResultDto): Promise<Result> {
    const createdTest = new this.resultModel(createquestionDto);
    return createdTest.save();
  }

}
