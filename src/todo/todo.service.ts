import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/createTodo.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/createUser.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async createTodo(todoDto) {
    const user = await this.userModel.findById(todoDto.user);
    const todo = await this.todoModel.create({
      name: todoDto.name,
      description: todoDto.description,
    });
    user.todos.push(todo);
    await user.save();
    return todo;
  }

  async getAllTodos() {
    return this.todoModel.find();
  }
}
