import { Module } from '@nestjs/common';
import PrismaModule from '@/prisma/prisma.module';
import PrismaService from '@/prisma/prisma.service';
import NotificationsController from './notifications.controller';
import NotificationsService from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService],
  imports: [PrismaModule]
})
export default class NotificationsModule {}
