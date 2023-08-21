import { Module } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import PrismaModule from './prisma/prisma.module';
import AdminController from './users/admin.controller';
import AdminModule from './users/admin.module';
import AdminService from './users/admin.service';
import UsersController from './users/users.controller';
import UsersModule from './users/users.module';
import UsersService from './users/users.service';

@Module({
  imports: [PrismaModule, UsersModule, UsersService, AdminModule, AdminService],
  controllers: [AppController, UsersController, AdminController],
  providers: [AppService]
})
export default class AppModule {}
