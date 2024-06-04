/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe, Query } from '@nestjs/common';
import { Result } from 'src/Schemas/result.schema';
import { ResultService } from './result.service';
import { ResultDto } from './result.dto';
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
  
  // get all the questions
  @Get(':id')
  async get(@Param('id') id:string):Promise<Result[]>{
    return await this.resultService.get(id);
  }

  // add a new test
  @Post()
  async add(@Body (new ValidationPipe()) body:ResultDto):Promise<Result>{
    return await this.resultService.add(body);
  }

}
