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
import { UserResponse, UserType } from '@app/user/types/user.type';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { AuthGuard } from '@app/user/guard/auth.guard';
import { User } from '@app/user/decorators/user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto): Promise<UserResponse> {
    const user = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.loginUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') paramId: string): Promise<UserType> {
    return await this.userService.findUserById(paramId);
    // return this.userService.buildUserResponse(user);
  }

  @Get('users')
  // @UseGuards(AuthGuard)
  async getAllUser(): Promise<UserType[]> {
    return await this.userService.getAllUsers();
    // return this.userService.buildUserResponse(user);
  }
}
