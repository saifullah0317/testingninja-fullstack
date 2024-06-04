/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/user.schema';
import { SignupDto, UserDto } from './user.dto';
import { UserInterface } from 'src/Schemas/user.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserInterface>) {}
  sendMail(to, subject, verificationCode, username) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '2020cs102@student.uet.edu.pk',
          pass: 'zpkp xabd cgss gvxd'
        }
      });
      
      const mailOptions = {
        from: '2020cs102@student.uet.edu.pk',
        to,
        subject,
        html:`<p style="font-size: x-large;">Hi, ${username}</p><p style="font-size: large;">This is you email verification code: ${verificationCode}</p>`
        // html:`<p style="font-size: x-large;">Hi, ${username}</p><p style="font-size: large;">Click this button to verify your account on Testingninja</p><br><a style="text-decoration: none; padding: 10px; background-color: purple; color: white; font-size: large; border-radius: 10px;" href="http://localhost:3000/signup?code=${verificationCode}">Verify account</a>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  async login(body):Promise<any>{
    try{
      const loggedinUser=await this.getByEmail(body.email);
      if(!loggedinUser){
        throw new HttpException('Invalid credentials',HttpStatus.NOT_FOUND);
      }
      else{
        if(body.password!=loggedinUser.password){
          throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
        }
        else{
          return {userId:loggedinUser._id.toString()};
        }
      }
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }

  async getall():Promise<User[]>{
    return await this.userModel.find().exec();
  }

  async add(createUserDto): Promise<UserInterface> {
    try {
      const tempObj=JSON.parse(JSON.stringify(createUserDto));
      tempObj.active=false;
      const createdUser = new this.userModel(tempObj);
      await createdUser.save();
      this.sendMail(createdUser.email, "Testingninja", tempObj.verificationCode, createdUser.username);
      return createdUser;
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  async getByEmail(email:string): Promise<UserInterface> {
    const userData=await this.userModel.findOne({email:email});
    if(!userData){
        throw new NotFoundException('Email not found !');
    }
    return userData;
  }
  async activateUser(id:string): Promise<UserInterface> {
    try {
      return await this.userModel.findByIdAndUpdate(id,{active:true},{new:true});
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(id:string,body:UserDto): Promise<User> {
    const updatedUser=await this.userModel.findByIdAndUpdate(id,body,{new:true});
    if(!updatedUser){
        throw new NotFoundException(`User ${body.username} not found...!`);
    }
    return updatedUser;
  }
}
