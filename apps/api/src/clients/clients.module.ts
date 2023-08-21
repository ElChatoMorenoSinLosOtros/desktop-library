import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import ClientsController from './clients.controller';
import ClientsService from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
  imports: [PrismaModule]
})
export default class ClientsModule {}
