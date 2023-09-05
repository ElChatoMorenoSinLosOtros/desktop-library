import PrismaModule from '@/prisma/prisma.module';
import PrismaService from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import FineController from './fine.controller';
import FineService from './fine.service';

@Module({
  controllers: [FineController],
  providers: [FineService, PrismaService],
  imports: [PrismaModule]
})
export default class FineModule {}
