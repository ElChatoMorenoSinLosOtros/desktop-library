import { Module } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import PrismaModule from './prisma/prisma.module';
import AuthController from './users/users.controller';
import UsersModule from './users/users.module';
import AuthModule from './users/users.service';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService]
})
export default class AppModule {}
