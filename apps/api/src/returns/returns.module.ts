import PrismaService from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import ReturnsController from './returns.controller';
import ReturnsService from './returns.service';

@Module({
  controllers: [ReturnsController],
  providers: [ReturnsService, PrismaService],
  imports: [PrismaModule]
})
export default class ReturnsModule {}
