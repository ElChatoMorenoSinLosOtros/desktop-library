import AdminsController from '@admins/admins.controller';
import AdminsService from '@admins/admins.service';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';

describe('AdminsController', () => {
  let controller: AdminsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AdminsController],
      providers: [AdminsService, PrismaService]
    }).compile();

    controller = module.get<AdminsController>(AdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
