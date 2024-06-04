/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'src/Schemas/result.schema';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }])],
  controllers: [ResultController],
  providers: [ResultService],
  exports:[ResultService]
})
export class ResultModule {}