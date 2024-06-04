/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'src/Schemas/response.schema';
import { ResponseDto } from './response.dto';
import { AttempterKeyDto } from './attempterKey.dto';
import { AttempterService } from 'src/attempters/attempter.service';
import { QuestionService } from 'src/questions/question.service';
import { TestService } from 'src/tests/test.service';
import { Types } from 'mongoose';

@Injectable()
export class ResponseService {
  constructor(@InjectModel(Response.name) private responseModel: Model<Response>,
  private readonly attempterService:AttempterService,
  private readonly questionService:QuestionService,
  private readonly testService:TestService) {}

  async get(query):Promise<Response[]>{
    if(query.attempter && query.question){
        return this.responseModel.find({attempterid:query.attempter, questionid:query.question}).populate({
            path:'questionid',
            populate:{
                path:'testid',
                model:'Test',
                populate:{
                    path:'userid',
                    model:'User'
                }
            }
        }).populate('attempterid')
    }
  }

  // async checkByAttempter(attempterKeyDto:AttempterKeyDto):Promise<{attempterid:string}>{
  //   const attempterFound=await this.attempterService.getbyEmail(attempterKeyDto.email);
  //   if(!attempterFound){
  //     throw new NotFoundException()
  //   }
  //   // console.log("attempterFound: ",attempterFound);
  //   const testFound=await this.testService.getByKey(attempterKeyDto.key);
  //   if(!testFound){
  //     throw new NotFoundException()
  //   }
  //   // console.log("testFound: ",testFound);
  //   const questionsFound=await this.questionService.getByTestid(testFound._id);
  //   if(questionsFound.length==0){
  //     throw new NotFoundException()
  //   }
  //   // console.log("questionsFound: ",questionsFound);
  //   const responseFound=await this.responseModel.find({attempterid:attempterFound._id, questionid:questionsFound[0]._id});
  //   // console.log("responseFound: ",responseFound);
  //   if(responseFound.length>0){
  //     return {attempterid:""};
  //   }
  //   else{
  //     return {attempterid:attempterFound._id.toString()};
  //   }
  // }

  async add(createResponseDto: ResponseDto): Promise<Response> {
    try {
      const createdResponse = new this.responseModel(createResponseDto);
      return (await createdResponse.save()).populate('responses.questionid');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
