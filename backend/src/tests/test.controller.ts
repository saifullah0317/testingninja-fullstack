/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Delete, ValidationPipe, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from 'src/Schemas/test.schema';
import { TestDto } from './test.dto';
import { JwtGuard } from 'src/auth/guards';
import { ExtractUser } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService,
    private readonly authService:AuthService
    ) {}
  
  // get all the tests
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get()
  async getall(@Req() req):Promise<Test[]>{
    console.log('cookies from request: ',req.cookies);
    let userid=await this.authService.getUseridByToken(req.cookies);
    console.log("user: ",userid);
    return await this.testService.getByUserid(userid);
  }

  @Get(':key')
  async getByKey(@Param('key') key:string):Promise<Test>{
    try {
      return (await this.testService.getByKey(key)).populate('questions');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // add a new test
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post()
  async add(@Body (new ValidationPipe()) body:TestDto, @Req() req):Promise<Test>{
    let testToPost=JSON.parse(JSON.stringify(body));
    testToPost.userid=await this.authService.getUseridByToken(req.cookies);
    return this.testService.add(testToPost);
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Put(':id')
  async updateTest(@Param('id') id: string, @Body() body: TestDto): Promise<Test> {
    try {
      return await this.testService.updateTest(id, body);
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Delete(':id')
  async deleteTest(@Param('id') id: string): Promise<Test>{
    try {
      return await this.testService.deleteTest(id);
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get(':testid')
  async sendKey(@Param('testid') testid:string):Promise<string[]>{
    try {
      return await this.testService.sendTestKey(testid);
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  @Post('checkkey')
  async initiateResponse(@Body() body:{email:string, key:string}):Promise<{testId:string, attempterId:string} | {message:string}>{
    try {
      return this.testService.initiateResponse(body.email, body.key);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
