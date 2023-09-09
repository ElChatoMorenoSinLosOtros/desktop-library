import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import FineController from './fine.controller';
import FineService from './fine.service';

@Module({
  controllers: [FineController],
  providers: [FineService, PrismaService],
  imports: [PrismaModule]
})
export default class FineModule {}
