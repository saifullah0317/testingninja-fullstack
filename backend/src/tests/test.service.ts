/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Model, ObjectId } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from 'src/Schemas/test.schema';
// import { Question } from 'src/Schemas/question.schema';
import { TestDto } from './test.dto';
import { TestInterface } from 'src/Schemas/test.schema';
import * as nodemailer from 'nodemailer';
import { AttempterService } from 'src/attempters/attempter.service';
import { AttempterListService } from 'src/attempterlists/attempterlist.service';
// import OpenAI from 'openai';
// import { QuestionService } from 'src/questions/question.service';


// import {OpenAI} from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";
// import { StructuredOutputParser } from "langchain/output_parsers";
// import { RunnableSequence } from "langchain/schema/runnable";

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test>,
    private readonly attempterListService:AttempterListService,
    private readonly attempterService:AttempterService,
    // private readonly questionService:QuestionService,
  ) {}

  async getall():Promise<Test[]>{
    return await this.testModel.find().populate('userid').exec();
  }

  async getByKey(testkey:string){
    try {
      let tempObj={key:testkey}
      // console.log("tempObj: ",tempObj);
      let test=await this.testModel.findOne(tempObj);
      // console.log("test in testService: ",test);
      return test;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async generateString(length) {
    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
  }

  async add(createTestDto: TestInterface): Promise<Test> {
    // const openai = new OpenAI({
    //   apiKey: process.env["OPENAI_API_KEY"]
    // });
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: `Generate a skill test related to the prompt: "${createTestDto.prompt}". There should be ${createTestDto.mcqs} MCQs, ${createTestDto.questions} theoretical questions, ${createTestDto.problems} problem solving questions. Your response should be an array of objects containing each question. Object of MCQ must be like {"q":"this is the question","o1":"option1","o2":"option2","o3":"option3","o4":"option4"} and other question's objects should be just like {"q":"this is the question"}. Just return me array of these objects nothing else !` }],
    //   model: 'gpt-3.5-turbo',
    // });
    // let response=completion.choices[0].message.content;
    // console.log("response: ",response);






    // console.log("parsed response: ",JSON.parse(response));






    // let structure={},genTemplate="",variables=[],inputQuest:any={};
    // if(createTestDto.mcqs<1){
    //   structure={
    //     question1:"problem solving or theoretical question",
    //     question2:"problem solving or theoretical question"
    //   }
    //   genTemplate="Generate questions according to the prompt: {prompt} \n Number of problem-solving questions: {psq} \n Number of theoretical questions: {tq} \n {format_instructions}"
    //   variables=["prompt","psq","tq"]
    //   inputQuest={
    //     prompt:createTestDto.prompt,
    //     psq:createTestDto.problems,
    //     tq:createTestDto.questions
    //   }
    // }
    // else{
    //   structure={
    //     mcq1:{
    //       question:"question for mcq",
    //       option1:"first option",
    //       option2:"second option",
    //       option3:"third option",
    //       option4:"fourth option"
    //     },
    //     question1:"problem solving or theoretical question",
    //     question2:"problem solving or theoretical question"
    //   }
    //   genTemplate="Generate questions according to the prompt: {prompt} \n Number of mcqs: {mcqs} \n Number of problem-solving questions: {psq} \n Number of theoretical questions: {tq} \n {format_instructions}"
    //   variables=["prompt","mcqs","psq","tq"]
    //   inputQuest={
    //     prompt:createTestDto.prompt,
    //     mcqs:createTestDto.mcqs,
    //     psq:createTestDto.problems,
    //     tq:createTestDto.questions
    //   }
    // }
    // const parser=StructuredOutputParser.fromNamesAndDescriptions(structure);
    // const formatInstructions=parser.getFormatInstructions();
    // const prompt=new PromptTemplate({
    //   template: genTemplate,
    //   inputVariables:variables,
    //   partialVariables:{format_instructions:formatInstructions}
    // });
    // const model = new OpenAI({ temperature: 0 });

    // const input=await prompt.format(inputQuest)
    // const response=await model.call(input)
    // console.log(await parser.parse(response));




    // const chain=RunnableSequence.from([
    //   PromptTemplate.fromTemplate(genTemplate),
    //   new OpenAI({temperature:0}),
    //   parser
    // ])
    // inputQuest.format_instructions=parser.getFormatInstructions();
    // const response=await chain.invoke(inputQuest);
    // console.log("response: ",response);

    try {
      let gottenTest=JSON.parse(JSON.stringify(createTestDto))
      let key:string=await this.generateString(6);
      gottenTest.key=key;
      console.log("gottenTest: ",gottenTest);
      const createdTest = new this.testModel(gottenTest);
      if(createdTest._id && createdTest.active){
        this.sendTestKey
      }
      return createdTest.save();
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  async updateTest(id:string, updateTestDto: TestDto): Promise<Test> {
    try {
      let gottenTest=JSON.parse(JSON.stringify(updateTestDto));
      let oldTest=await this.testModel.findById(id);
      gottenTest.userid=oldTest.userid;
      gottenTest.key=oldTest.key;
      const updatedTest=await this.testModel.findByIdAndUpdate(id,gottenTest,{new:true});
      return updatedTest;
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  async deleteTest(id:string){
    try {
      return await this.testModel.findByIdAndDelete(id);
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  async getByUserid(userid:string): Promise<any> {
    const testData=await this.testModel.find({userid:userid}).populate('categoryid').populate('questions').populate('attempterListid');
    return testData;
  }

  async sendTestKey(testid: string):Promise<string[]> {
    try {
      const foundTest=await this.testModel.findById(testid).populate('userid').populate({path:'attempterListid', populate:{path:'attempters', model:'Attempter'}});
      let allEmails=[], notSent=[];
      for(let i=0;i<foundTest.attempterListid.length;i++){
        allEmails=[...allEmails, ...foundTest.attempterListid[i].attempters.map(attempter => attempter.email)];
      }
      console.log("allEmails: ",allEmails);
      for(let i=0;i<allEmails.length;i++){
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '2020cs102@student.uet.edu.pk',
            pass: 'zpkp xabd cgss gvxd'
          }
        });
        
        const mailOptions = {
          from: '2020cs102@student.uet.edu.pk',
          to:allEmails[i],
          subject:`Exam Key for ${foundTest.title}`,
          html:`<p style="font-size: x-large;">Hi ${allEmails[i].split(/[0-9]/g)[0]?allEmails[i].split(/[0-9]/g)[0]:allEmails[i].split('@')[0]},</p><p style="font-size: large;">Exam key for "${foundTest.title}" is: ${foundTest.key}</p>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            notSent.push(allEmails[i]);
          }
        });
      }
      return notSent;
    } catch (error) {
      if(error.message){throw new HttpException(error.message, HttpStatus.BAD_REQUEST)}
      else{throw new HttpException(error, HttpStatus.BAD_REQUEST)}
    }
  }

  async initiateResponse(email:string, key:string){
    try {
      const foundAttempter=await this.attempterService.getbyEmail(email);
      const foundTest=await this.testModel.findOne({key:key});
      let attempterId;
      if(foundTest){
        if(!foundTest.active){
          return {message:"Test not available to attempt !"}
        }
        else{
          if(foundTest.allowAll){
            if(foundAttempter){
              attempterId=foundAttempter._id;
            }
            else{
              const createdAttempter=await this.attempterService.add({email:email});
              attempterId=createdAttempter._id;
            }
          }
          else{
            if(foundTest.attempterListid){
              for(let i=0;i<foundTest.attempterListid.length;i++){
                let attempterList:any=await this.attempterListService.getByListId(foundTest.attempterListid[i].toString());
                if(attempterList.includes(foundAttempter._id)){
                  attempterId=foundAttempter._id;
                  i=foundTest.attempterListid.length;
                }
              }
              if(!attempterId){
                return {message:"You are not allowed to attempt this test !"}
              }
            }
            else{
              return {message:"You are not allowed to attempt this test !"}
            }
          }
        }

        if(attempterId){
          return {testId:foundTest._id.toString(), attempterId:attempterId.toString()}
        }
      }
      else{
        return {message:"No test found with this key !"}
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}