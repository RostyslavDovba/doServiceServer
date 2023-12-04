import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserResponse } from '@app/user/types/user.type';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { AuthGuard } from '@app/user/guard/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto): Promise<UserResponse> {
    const user = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Post('user/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.loginUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') param): Promise<UserResponse> {
    const user = await this.userService.findUserById(param);
    return this.userService.buildUserResponse(user);
  }
}
