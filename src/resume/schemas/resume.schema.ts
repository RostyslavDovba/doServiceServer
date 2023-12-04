import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema()
export class Resume {
  @Prop()
  userName: string;

  @Prop()
  age: number;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
