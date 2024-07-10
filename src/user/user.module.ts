import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { CheckUserIdMiddleware } from './middlewares/check.user.id.middleware';
import { CheckUserIdExistsMiddleware } from './middlewares/check.user.id.exists.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserIdMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });

    consumer.apply(CheckUserIdExistsMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
