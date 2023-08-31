import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import AdminsController from './admins.controller';
import AdminsService from './admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  imports: [PrismaModule],
  exports: [AdminsService]
})
export default class AdminsModule {}
