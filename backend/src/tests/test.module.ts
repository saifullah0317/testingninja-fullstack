/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from 'src/Schemas/test.schema';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AttempterModule } from 'src/attempters/attempter.module';
import { AttempterListModule } from 'src/attempterlists/attempterlist.module';
// import { QuestionModule } from 'src/questions/question.module';

@Module({
  imports: [AuthModule, AttempterListModule, AttempterModule, MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }])],
  controllers: [TestController],
  providers: [TestService,JwtService],
  exports:[TestService]
})
export class TestModule {}