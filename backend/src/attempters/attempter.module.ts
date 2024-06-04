/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempter, AttempterSchema } from 'src/Schemas/attempter.schema';
import { AttempterController } from './attempter.controller';
import { AttempterService } from './attempter.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attempter.name, schema: AttempterSchema }])],
  controllers: [AttempterController],
  providers: [AttempterService],
  exports:[AttempterService]
})
export class AttempterModule {}