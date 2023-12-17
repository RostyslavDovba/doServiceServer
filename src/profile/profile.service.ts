import { Injectable } from '@nestjs/common';
import { ProfileType } from '@app/profile/types/profile.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@app/user/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async getCurrentProfile(userId: string): Promise<ProfileType> {
    const user = await this.userModel
      .findById(userId)
      .select('+resume')
      .populate('resume')
      .exec();

    // .exec();
    return user;
  }
}
