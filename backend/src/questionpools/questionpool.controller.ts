/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { ExtractUser } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { QuestionPoolService } from './questionpool.service';
import { QuestionPool } from 'src/Schemas/questionPool.schema';
import { QuestionPoolDto } from './questionpool.dto';

@Controller('questionpool')
export class QuestionPoolController {
  constructor(private readonly questionPoolService: QuestionPoolService, private readonly authService:AuthService) {}
  
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get()
  async getall(@Req() req):Promise<QuestionPool[]>{
    let userid=await this.authService.getUseridByToken(req.cookies);
    console.log("user id while getting attempterslists: ",userid);
    return await this.questionPoolService.getbyuserid(userid);
  }

  // add new list
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post()
  async addlist(@Req() req,@Body (new ValidationPipe()) body:QuestionPoolDto):Promise<QuestionPool>{
    let tempObj=JSON.parse(JSON.stringify(body));
    tempObj.userid=await this.authService.getUseridByToken(req.cookies);
    return await this.questionPoolService.addlist(tempObj);
  }
  
}
