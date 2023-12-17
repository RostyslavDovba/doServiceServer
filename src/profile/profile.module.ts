import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserService } from '@app/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/user/schemas/user.schema';
import { JwtGlobalModule } from '@app/shared/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
