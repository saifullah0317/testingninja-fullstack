/* eslint-disable prettier/prettier */
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class ExtractUser implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
    //   const token = this.extractTokenFromHeader(request);
      const token=request.cookies.user_token;
      console.log("request.cookies: ",request.cookies);
      if (!token) {
        console.log("token not in cookies ...!");
        throw new UnauthorizedException();
      } 
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET
          }
        );
        // We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        console.log("payload in auth guard: ",payload);
        request['user'] = payload;
      } catch(e) {
        console.log("Invalid credentials ...!, error: ",e);
        throw new UnauthorizedException();
      }
      return true;
    }
  
    // private extractTokenFromHeader(request: Request): string | undefined {
    //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //   return type === 'Bearer' ? token : undefined;
    // }
  }