import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';

import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/user/schemas/createUser.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
