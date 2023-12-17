import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { TrackModule } from '@app/track/track.module';
import { FileModule } from '@app/file/file.module';
import { ResumeModule } from '@app/resume/resume.module';
import { AppController } from '@app/app.controller';
import { UserModule } from '@app/user/User.module';
import { TodoModule } from '@app/todo/todo.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ProfileModule } from '@app/profile/profile.module';
import { JwtGlobalModule } from './shared/jwt.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
    JwtGlobalModule,
    // JwtModule.registerAsync({
    //   useFactory: async () => {
    //     return {
    //       secret: process.env.JWT_SECRET,
    //       // signOptions: { expiresIn: '1d' },
    //     };
    //   },
    // }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ovbrcch.mongodb.net/pet-project?retryWrites=true&w=majority`,
    ),
    TodoModule,
    UserModule,
    TrackModule,
    FileModule,
    ResumeModule,
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
