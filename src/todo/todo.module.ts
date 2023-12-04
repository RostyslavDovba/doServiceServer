import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/createTodo.schema';
import { User, UserSchema } from 'src/user/schemas/createUser.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/User.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: User.name, schema: UserSchema },
    ]),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
