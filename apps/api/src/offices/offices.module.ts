import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import OfficesController from './offices.controller';
import OfficesService from './offices.service';

@Module({
  controllers: [OfficesController],
  providers: [OfficesService, PrismaService],
  imports: [PrismaModule]
})
export default class OfficesModule {}
