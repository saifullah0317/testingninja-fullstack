/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AttempterListService } from './attempterlist.service';
import { AttempterList, AttempterListInterface } from 'src/Schemas/attempterList.schema';
import { AttempterListDto } from './attempterlist.dto';
import { JwtGuard } from 'src/auth/guards';
import { ExtractUser } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AttempterService } from 'src/attempters/attempter.service';

@Controller('attempterlist')
export class AttempterListController {
  constructor(private readonly attempterService:AttempterService, private readonly attempterListService: AttempterListService, private readonly authService:AuthService) {}
  
  // get list of attempters for loggedin user
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Get()
  async getall(@Req() req):Promise<AttempterList[]>{
    try{
      let userid=await this.authService.getUseridByToken(req.cookies);
      const foundLists=await this.attempterListService.getbyuserid(userid);
      // let index=0, tempAttemptersArray=[];
      // if(foundLists){
      //   while(index<foundLists.length){
      //     const attemptersEmails=await this.attempterService.getbyIds(foundLists[index].attempters);
      //     // let tempList={userid:foundLists[index].userid, title:foundLists[index].title, description:foundLists[index].description, attempters:[], date:foundLists[index].createdAt};
      //     let tempList=foundLists[index]
      //     if(attemptersEmails){
      //       tempList.attempters=attemptersEmails;
      //       tempAttemptersArray.push(tempList); 
      //     }
      //     index++;
      //   }
      // }
      // return tempAttemptersArray; 
      return foundLists;
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Put(':id')
  async updateList(@Param('id') id:string, @Req() req,@Body (new ValidationPipe()) body:AttempterListInterface):Promise<AttempterList>{
    try{
      let tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      const updatedList=await this.attempterListService.updateList(id,tempObj);
      return updatedList;
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }

  // add new list
  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Post()
  async addlist(@Req() req,@Body (new ValidationPipe()) body:AttempterListDto):Promise<AttempterList>{
    try{
      let tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      const createdList= await this.attempterListService.addlist(tempObj);
      return createdList;
    }
    catch(e){
      console.log("error in controller: ",e);
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @UseGuards(ExtractUser)
  @Delete(':id')
  async deletelist(@Param('id') id:string):Promise<AttempterList>{
    try {
      const deletedList=await this.attempterListService.deletelist(id);
      return deletedList;
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  
}
