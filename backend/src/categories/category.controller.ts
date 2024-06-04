/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { ExtractUser } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CategoryService } from './category.service';
import { Category } from 'src/Schemas/category.schema';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly authService:AuthService) {}
  
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get()
  async getall(@Req() req):Promise<Category[]>{
    try {
      let userid=await this.authService.getUseridByToken(req.cookies);
      console.log("user id while getting attempterslists: ",userid);
      return await this.categoryService.getbyuserid(userid);
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
  }

  // add new list
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post()
  async add(@Req() req,@Body (new ValidationPipe()) body:CategoryDto):Promise<Category>{
    try {
      let tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return await this.categoryService.add(tempObj); 
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
  }
  
}
