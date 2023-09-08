import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateNotificationDto from './dto/create-notification.dto';
import UpdateNotificationDto from './dto/update-notification.dto';

@Injectable()
export default class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto
    });
  }

  async createBatch(notifications: CreateNotificationDto[]) {
    const notificationData = notifications.map(notification => ({
      notificationName: notification.notificationName,
      notificationType: notification.notificationType,
      notificationContent: notification.notificationContent
    }));
    return this.prisma.notification.createMany({
      data: notificationData
    });
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  findOne(notificationId: number) {
    return this.prisma.notification.findUnique({
      where: { notificationId }
    });
  }

  update(notificationId: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { notificationId },
      data: updateNotificationDto
    });
  }

  remove(notificationId: number) {
    return this.prisma.notification.delete({
      where: { notificationId }
    });
  }

  removeAll() {
    return this.prisma.notification.deleteMany();
  }
}
