/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './user.dto';
import { SignupDto } from './user.dto';
import { User } from 'src/Schemas/user.schema';
import { CategoryService } from 'src/categories/category.service';
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  
  // get all the users
  @Get()
  async getall():Promise<User[]>{
    return await this.usersService.getall();
  }
  
  // get user by email
  @Post()
  getByEmail(@Body() body:any):Promise<User>{
    return this.usersService.getByEmail(body.email);
  }

  // add a new user
  @Post()
  add(@Body (new ValidationPipe()) body:SignupDto):Promise<User>{
    return this.usersService.add(body);
  }

  // update a user
  @Put(':id')
  updateUser(@Param('id') id:string, @Body(new ValidationPipe()) body:UserDto):Promise<User>{
    return this.usersService.updateUser(id, body);
  }
}
