/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}
  async getUseridByToken(cookies){
    const obj= await this.jwtService.verifyAsync(cookies.user_token,{
      secret:process.env.JWT_SECRET
    });
    if(obj.userId){
        return obj.userId
    }
    else{
        throw new UnauthorizedException();
    }
  }
//   async signIn(username, pass) {
//     const user = await this.usersService.findOne(username);
//     if (user?.password !== pass) {
//       throw new UnauthorizedException();
//     }
//     const payload = { sub: user.userId, username: user.username };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
}