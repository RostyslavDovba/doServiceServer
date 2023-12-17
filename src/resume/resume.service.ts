import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@app/user/schemas/user.schema';
import { CreateResumeDto } from '@app/resume/dto/resume-create.dto';
import { UpdateResumeDto } from './dto/resume-update.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createResume(
    dto: CreateResumeDto,
    currentUserId: string,
  ): Promise<Resume> {
    const user = await this.userModel.findById(currentUserId).select('+resume');
    const resume = await this.resumeModel.findById(user.resume._id);

    if (user.resume && Boolean(resume)) {
      throw new HttpException(
        'The resume you are trying to create already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newResume = await this.resumeModel.create({
      ...dto,
    });
    user.resume = newResume._id;
    await user.save();
    return newResume;
  }

  async updateResume(
    updateResumeDto: UpdateResumeDto,
    currentUserId: string,
  ): Promise<Resume> {
    const user = await this.userModel.findById(currentUserId).select('+resume');
    if (!user.resume) {
      throw new HttpException(
        'User does not have a resume',
        HttpStatus.NOT_FOUND,
      );
    }
    const resume = await this.resumeModel.findById(user.resume._id);
    Object.assign(resume, updateResumeDto);
    await resume.save();
    return resume;
  }

  async getResume(resumeId: string) {
    const resume = (await this.resumeModel.findById(resumeId)).populate('user');

    return resume;
  }

  // getAllResume() {}

  // getOneResume() {}
}
