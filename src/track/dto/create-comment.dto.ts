import { ObjectId } from 'mongoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @IsNotEmpty()
  readonly text: string;
  readonly trackId: ObjectId;
}
