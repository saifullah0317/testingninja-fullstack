/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { QuestionPool, QuestionPoolSchema } from 'src/Schemas/questionPool.schema';
import { QuestionPoolController } from './questionpool.controller';
import { QuestionPoolService } from './questionpool.service';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forFeature([{ name: QuestionPool.name, schema: QuestionPoolSchema }])],
  controllers: [QuestionPoolController],
  providers: [QuestionPoolService,JwtService],
//   exports:[QuestionService]
})
export class QuestionPoolModule {}