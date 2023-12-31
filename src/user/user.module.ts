import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/user/schemas/user.schema';
import { JwtGlobalModule } from '@app/shared/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtGlobalModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
