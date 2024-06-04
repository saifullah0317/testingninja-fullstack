/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttempterList, AttempterListSchema } from 'src/Schemas/attempterList.schema';
import { AttempterModule } from 'src/attempters/attempter.module';
import { AttempterListController } from './attempterlist.controller';
import { AttempterListService } from './attempterlist.service';
import { UsersModule } from 'src/users/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, AuthModule,  AttempterModule, MongooseModule.forFeature([{ name: AttempterList.name, schema: AttempterListSchema }])],
  controllers: [AttempterListController],
  providers: [AttempterListService,JwtService],
  exports:[AttempterListService]
})
export class AttempterListModule {}