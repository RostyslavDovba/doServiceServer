import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResumeService } from '@app/resume/resume.service';
import { CreateResumeDto } from '@app/resume/dto/resume-create.dto';
import { AuthGuard } from '@app/user/guard/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UpdateResumeDto } from './dto/resume-update.dto';

@Controller('resume')
export class ResumeController {
  constructor(private resumeServices: ResumeService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createResume(
    @Body() createResumeDto: CreateResumeDto,
    @User('id') currentUserId: string,
  ) {
    const resume = await this.resumeServices.createResume(
      createResumeDto,
      currentUserId,
    );

    return resume;
  }

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateResume(
    @Body() updateResumeDto: UpdateResumeDto,
    @User('id') currentUserId: string,
  ) {
    const resume = await this.resumeServices.updateResume(
      updateResumeDto,
      currentUserId,
    );

    return resume;
  }

  // @Delete('create')
  // @UseGuards(AuthGuard)
  // async deleteResume(
  //   @Body() createResumeDto: CreateResumeDto,
  //   @User('id') currentUserId: string,
  // ) {
  //   const resume = await this.resumeServices.createResume(
  //     createResumeDto,
  //     currentUserId,
  //   );

  //   return resume;
  // }

  // @Get(':id')
  // async getOneResume(@Param('id') paramId) {
  //   return await this.resumeServices.getResume(paramId);
  // }

  // @Get()
  // getProfileResume() {}
}
