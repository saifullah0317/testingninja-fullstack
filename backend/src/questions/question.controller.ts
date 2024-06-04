/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from 'src/Schemas/question.schema';
import { QuestionDto } from './question.dto';
import { JwtGuard } from 'src/auth/guards';
import { ExtractUser } from 'src/auth/auth.guard';
import { ObjectId } from 'mongoose';
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  
  // get all the questions
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get()
  async getall():Promise<Question[]>{
    return await this.questionService.getall();
  }
  
  // get test by testid
  // @Get(':id')
  // async getByEmail(@Param('id') id:ObjectId):Promise<Question[]>{
  //   return await this.questionService.getByTestid(id);
  // }

  // @Get('key/:testkey')
  // async getByKey(@Param('testkey') testkey:string):Promise<Question[]>{
  //   return await this.questionService.getByKey(testkey);
  // }
 
  // add a new test
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post()
  async add(@Body (new ValidationPipe()) body:QuestionDto):Promise<Question>{
    return await this.questionService.add(body);
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post('all')
  async addAll(@Body (new ValidationPipe()) body:{questions:QuestionDto[]}):Promise<Question[]>{
    try {
      return await this.questionService.addAll(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  // edit question
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Put(':id')
  async update(@Param('id') id:string,@Body (new ValidationPipe()) body:QuestionDto):Promise<Question>{
    return await this.questionService.update(id,body);
  }

  // delete question
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Delete(':id')
  async delete(@Param('id') id:string):Promise<Question>{
    return await this.questionService.delete(id);
  }
}
