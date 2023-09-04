import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import ReserveController from './reserve.controller';
import ReserveService from './reserve.service';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, PrismaService],
  imports: [PrismaModule]
})
export default class ReserveModule {}
