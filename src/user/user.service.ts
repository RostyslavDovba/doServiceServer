import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { User, UserDocument } from '@app/user/schemas/user.schema';
import { UserResponse, UserType } from '@app/user/types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto): Promise<UserType> {
    const user = new this.userModel(userDto);
    return user.save();
  }

  async loginUser(userDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: userDto.email })
      .select('+password');
    if (!user) {
      throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
    }
    const isPasswordCorrect = await compare(userDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'The password is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async findUserById(id: string): Promise<UserType> {
    return await this.userModel
      .findById(id)
      // .select('+password')
      .populate('resume');
  }

  async getAllUsers() {
    // const cur = fetch(
    //   'https://api.privatbank.ua/p24api/exchange_rates?json&date=01.11.2020',
    //   // 'https://api.monobank.ua/bank/currency',
    // ).then((res) => res.json());
    // const exR = await cur.then((data) => data.exchangeRate);

    // const users = await this.userModel.find().populate('todos');

    // // return [exR, users];
    // return users;

    // const users = await this.userModel.find().populate('todos');
    const users = await this.userModel.find().populate('resume');
    // console.log(
    //   '🚀 ~ file: user.service.ts:55 ~ UserService ~ getAllUsers ~ users:',
    //   users,
    // );

    return users;

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(users);
    //   }, 2000); // Delay of 2 seconds
    // });
  }

  private generateToken(user: UserType): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  buildUserResponse(user: UserType): UserResponse {
    const { username, email, id, resume } = user;
    const token = this.generateToken(user);
    return {
      id,
      username,
      email,
      token,
      resume,
    };
  }
}
