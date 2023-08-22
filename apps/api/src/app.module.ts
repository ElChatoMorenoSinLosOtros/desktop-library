import { Module } from '@nestjs/common';
import AdminsModule from './admins/admins.module';
import AppController from './app.controller';
import AppService from './app.service';
import AuthModule from './auth/auth.module';
import PrismaModule from './prisma/prisma.module';
import UsersModule from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService]
})
export default class AppModule {}
