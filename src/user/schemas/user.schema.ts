import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { hash } from 'bcrypt';
import { Todo } from 'src/todo/schemas/createTodo.schema';
import { Resume } from '@app/resume/schemas/resume.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    type: [{ type: 'ObjectId', ref: 'Todo' }],
    select: false,
  })
  todos: Todo[];

  @Prop({ type: 'ObjectId', ref: 'Resume', select: false })
  resume: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function () {
  if (this.isModified('password') || this.isNew) {
    this.password = await hash(this.password, 10);
  }
});
// UserSchema.set('toObject', { getters: true });
