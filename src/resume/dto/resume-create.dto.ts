import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsArray,
  IsEmail,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

import {
  IEducation,
  ILink,
  IPersonalData,
  ISkill,
  IWorkExperience,
  ILanguage,
  IHobby,
} from '@app/resume/types/resume.types';
import { IsArrayHasObject } from '@app/shared/custom-dto-validator/IsArrayHasObject';

class LinkDTO implements ILink {
  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class PersonalInfoDTO implements IPersonalData {
  @IsString()
  @MinLength(4)
  // @IsNotEmpty()
  @IsOptional()
  userName: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  // @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  // @IsNotEmpty()
  email: string;

  @MinLength(10)
  @IsOptional()
  // @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  city: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LinkDTO)
  socialLinks?: LinkDTO[];
}

class WorkExperienceDTO implements IWorkExperience {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;
}

class EducationDTO implements IEducation {
  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location: string;
}

class LanguageDTO implements ILanguage {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}

class SkillDTO implements ISkill {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  proficiency: string;
}

class HobbyDTO implements IHobby {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  link: string;
}

class ProjectLinkDTO implements ILink {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  label: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

class CertificateDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export class CreateResumeDto {
  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => PersonalInfoDTO)
  personalInfo: PersonalInfoDTO;

  @IsDefined()
  // @IsArrayHasObject()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDTO)
  workExperience: WorkExperienceDTO[];

  // @IsDefined()
  // @IsArrayHasObject()
  // @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => EducationDTO)
  education: EducationDTO[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => LanguageDTO)
  languages: LanguageDTO[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SkillDTO)
  skills: SkillDTO[];

  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => ProjectLinkDTO)
  projectLinks: ProjectLinkDTO[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => HobbyDTO)
  hobbies: HobbyDTO[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => CertificateDTO)
  certificates: CertificateDTO[];

  constructor(partial: Partial<CreateResumeDto>) {
    Object.assign(this, partial);
  }
}
