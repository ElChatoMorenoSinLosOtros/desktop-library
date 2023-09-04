import { Test, TestingModule } from '@nestjs/testing';

import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import OfficesController from '@/offices/offices.controller';
import OfficesService from '@/offices/offices.service';

describe('OfficesController', () => {
  let controller: OfficesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficesController],
      providers: [OfficesService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<OfficesController>(OfficesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
