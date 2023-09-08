import { Test, TestingModule } from '@nestjs/testing';
import NotificationsController from '@/notifications/notifications.controller';
import NotificationsService from '@/notifications/notifications.service';
import PrismaModule from '@/prisma/prisma.module';
import PrismaService from '@/prisma/prisma.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
