import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post('todo')
  async create(@Body() body) {
    return this.todoService.createTodo(body);
  }

  @Get('todo')
  async getAll() {
    return this.todoService.getAllTodos();
  }

  // @Get('todo/:id')
  // async getTodo()
}
