/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Model, ObjectId } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionInterface } from 'src/Schemas/question.schema';
// import {OtionalQuestionDto} from './question.dto';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

  async getall():Promise<Question[]>{
    return await this.questionModel.find().exec();
  }
  // async getByKey(key:string){
  //   const test:any=await this.testService.getByKey(key);
  //   if(test){
  //     let test_id=test._id;
  //     const questions=await this.getByTestid(test_id);
  //     return questions;
  //   }
  //   else{
  //     return [];
  //   }
  // }

  async add(createquestionDto: QuestionDto): Promise<Question> {
    const createdTest = new this.questionModel(createquestionDto);
    return await createdTest.save();
  }

  async addAll(createAllQuestionsDto:{questions:QuestionDto[]}): Promise<Question[]> {
    try{
      const createdQuestions: Question[] = [];
      for(let i=0;i<createAllQuestionsDto.questions.length;i++){
        const foundQuestion = await this.questionModel.findOne({question: createAllQuestionsDto.questions[i].question});
        if(!foundQuestion){
          const createdQuestion = new this.questionModel(createAllQuestionsDto.questions[i]);
          await createdQuestion.save();
          createdQuestions.push(createdQuestion);
        }
        else{
          createdQuestions.push(foundQuestion);
        }
      }
      return createdQuestions;
    }
    catch(e){
      throw new HttpException(e.message,HttpStatus.BAD_REQUEST);
    }
  }

  // async getByTestid(test_id): Promise<any> {
  //   const testData=await this.questionModel.find({testid:test_id});
  //   return testData;
  // }

  async update(id:string,body:QuestionDto):Promise<Question>{
    return await this.questionModel.findByIdAndUpdate(id,body,{new:true});
  }

  async delete(id:string):Promise<Question>{
    return await this.questionModel.findByIdAndDelete(id);
  }

}
