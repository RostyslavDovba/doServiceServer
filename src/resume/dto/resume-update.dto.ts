import { CreateResumeDto } from '@app/resume/dto/resume-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {}
