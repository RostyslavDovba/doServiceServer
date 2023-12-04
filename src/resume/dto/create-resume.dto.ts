import { IsString, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  userName: string;

  @IsNumber()
  age: number;
}
