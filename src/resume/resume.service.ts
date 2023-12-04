import { Injectable } from '@nestjs/common';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
  ) {}
  async createResume(dto: any): Promise<Resume> {
    const resume = this.resumeModel.create({ ...dto });
    return resume;
  }

  getAllResume() {}

  getOneResume() {}
}
