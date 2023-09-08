import { Test, TestingModule } from '@nestjs/testing';
import NotificationsService from '@/notifications/notifications.service';
import PrismaModule from '@/prisma/prisma.module';
import PrismaService from '@/prisma/prisma.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
