/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attempter } from 'src/Schemas/attempter.schema';
import { AttempterInterface } from 'src/Schemas/attempter.schema';
import { AttempterDto } from './attempter.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class AttempterService {
  constructor(@InjectModel(Attempter.name) private attempterModel: Model<Attempter>) {}

  // async getall(query:Query):Promise<Attempter[]>{
  //   if(query.email){
  //       return await this.attempterModel.find({email:query.email});
  //   }
  //   return await this.attempterModel.find().exec();
  // }
  async getbyEmail(email:string):Promise<AttempterInterface>{
    try {
      return await this.attempterModel.findOne({email:email})
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }
  async getbyIds(ids:string[]):Promise<string[]>{
    try{
      let index=0, emails=[];
      while(index<ids.length){
        let foundAttempter=await this.attempterModel.findById(ids[index]);
        emails.push(foundAttempter.email);
        index++;
      }
      return emails;
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }
  async add(createattempterDto: AttempterDto): Promise<AttempterInterface> {
    try {
      const createdAttempter = new this.attempterModel(createattempterDto);
      return await createdAttempter.save();
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }
}