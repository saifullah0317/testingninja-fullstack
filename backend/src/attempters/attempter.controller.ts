/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AttempterService } from './attempter.service';
import { Attempter, AttempterInterface } from 'src/Schemas/attempter.schema';
import { AttempterDto } from './attempter.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('attempter')
export class AttempterController {
  constructor(private readonly attempterService: AttempterService) {}
  
  // get attempter by email
  // @Get()
  // async getbyEmail(@Query() query:ExpressQuery):Promise<AttempterInterface|string[]>{
  //   try{
  //     if(query.email){
  //       return await this.attempterService.getbyEmail(query.email.toString());
  //     }
  //     else if(query.id){
  //       const attemptersIds=await this.attempterListService.getByListId(query.id.toString());
  //       return await this.attempterService.getbyIds(attemptersIds);
  //     }
  //   }
  //   catch(e){
  //     throw new HttpException(e,HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Post('getmails')
  // async getbyIds(@Body (new ValidationPipe()) body):Promise<string[]>{
  //   try{
  //     if(body.attempters){
  //       return await this.attempterService.getbyIds(body.attempters);
  //     }
  //   }
  //   catch(e){
  //     throw new HttpException(e,HttpStatus.BAD_REQUEST);
  //   } 
  // }

  @Post()
  async add(@Body (new ValidationPipe()) body:AttempterDto):Promise<AttempterInterface|unknown>{
    return await this.attempterService.add(body);
  }
}
