import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';

@Controller('/resume')
export class ResumeController {
  constructor(private resumeServices: ResumeService) {}

  @Post()
  createResume(@Body() dto: CreateResumeDto) {
    console.log("🚀 ~ file: resume.controller.ts:11 ~ ResumeController ~ createResume ~ dto:", dto)
    return this.resumeServices.createResume(dto);
  }

  @Get()
  getOneResume() {
    return 'some data';
  }

  @Get()
  getAllResumes() {}
}
