import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ResumeModule } from './resume/resume.module';
import { AppController } from './app.controller';
import { UserModule } from './user/User.module';
import { TodoModule } from './todo/todo.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ovbrcch.mongodb.net/pet-project?retryWrites=true&w=majority`,
    ),
    TodoModule,
    UserModule,
    TrackModule,
    FileModule,
    ResumeModule,
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
