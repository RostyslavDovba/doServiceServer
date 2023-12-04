import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { Todo } from 'src/todo/schemas/createTodo.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
  })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function () {
  this.password = await hash(this.password, 10);
});
UserSchema.set('toObject', { getters: true });
