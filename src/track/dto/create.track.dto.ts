import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsString()
  text: string;
}
