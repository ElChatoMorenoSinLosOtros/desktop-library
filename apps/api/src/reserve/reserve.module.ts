import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReserveController from './reserve.controller';
import ReserveService from './reserve.service';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, PrismaService],
  imports: [PrismaModule]
})
export default class ReserveModule {}
