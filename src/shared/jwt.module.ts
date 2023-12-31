import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// @Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        // signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
