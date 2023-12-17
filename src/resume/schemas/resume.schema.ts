import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { User } from '@app/user/schemas/user.schema';
import {
  IEducation,
  IWorkExperience,
  ILink,
  ILanguages,
  ISkills,
  IHobbies,
  ICertificates,
  IPersonalData,
} from '@app/resume/types/resume.types';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema()
export class Resume {
  @Prop({ type: Object })
  personalInfo: IPersonalData;

  @Prop()
  workExperience: IWorkExperience[];

  @Prop()
  education: IEducation[];

  @Prop()
  projectSocialLink: ILink[];

  @Prop()
  languages: ILanguages[];

  @Prop()
  skills: ISkills[];

  @Prop()
  hobbies: IHobbies[];

  @Prop()
  certificates: ICertificates[];

  @Prop({ type: 'ObjectId', ref: User.name })
  user: User;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
