import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ClientsController from './clients.controller';
import ClientsService from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
  imports: [PrismaModule]
})
export default class ClientsModule {}
