import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import AdminsController from './admins.controller';
import AdminsService from './admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  imports: [PrismaModule]
})
export default class AdminsModule {}
