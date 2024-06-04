/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Response, ResponseSchema } from 'src/Schemas/response.schema';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { AttempterModule } from 'src/attempters/attempter.module';
import { QuestionModule } from 'src/questions/question.module';
import { TestModule } from 'src/tests/test.module';

@Module({
  imports: [AttempterModule, QuestionModule, TestModule, MongooseModule.forFeature([{ name: Response.name, schema: ResponseSchema }])],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports:[ResponseService]
})
export class ResponseModule {}