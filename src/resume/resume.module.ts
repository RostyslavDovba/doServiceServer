import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { User, UserSchema } from '@app/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resume.name, schema: ResumeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
