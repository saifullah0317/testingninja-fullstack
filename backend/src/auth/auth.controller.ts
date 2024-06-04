/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Post, Body, ValidationPipe, HttpException, HttpStatus, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/login.dto';
import { SignupDto, UserDto } from 'src/users/user.dto';
import { VerifyUserDto } from './verifyUser.dto';
import { UsersService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService,
    private userService:UsersService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) body:LoginDto, @Res({ passthrough: true }) res, @Req() req) {
    try{
      const userId=await this.userService.login(body);
      if(userId.userId==""){
        return {message:"Invalid credentials"}
      }
      const token= this.jwtService.sign(userId);
      res.cookie('user_token',token, {
        httpOnly: true, 
        // secure: false,
        // sameSite: 'lax',
        expires: new Date(Date.now() + 3600000),
      });
      return {token};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.NOT_FOUND);
    }
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body:SignupDto, @Res({ passthrough: true }) res){
    try{
      const user=await this.userService.add(body);
      const token=this.jwtService.sign({userId:user._id});
      res.cookie('user_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      });
      return {token, user};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res, @Req() req) {
    try{
      res.cookie('user_token', '', { expires: new Date(0) });
      return {message:"loggedout!"};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }
}
