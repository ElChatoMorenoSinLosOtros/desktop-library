import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import PrismaModule from 'src/prisma/prisma.module';
import ReservationsService from './reservations.service';
import ReservationsController from './reservations.controller';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  imports: [PrismaModule]
})
export default class ReservationsModule {}
