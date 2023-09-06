import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReturnsController from './returns.controller';
import ReturnsService from './returns.service';

@Module({
  controllers: [ReturnsController],
  providers: [ReturnsService, PrismaService],
  imports: [PrismaModule]
})
export default class ReturnsModule {}
