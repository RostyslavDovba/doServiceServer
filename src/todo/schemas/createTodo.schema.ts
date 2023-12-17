import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '@app/user/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;
@Schema()
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
