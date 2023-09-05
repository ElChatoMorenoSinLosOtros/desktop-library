import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReserveController from '@reserve/reserve.controller';
import ReserveService from '@reserve/reserve.service';

describe('ReserveController', () => {
  let controller: ReserveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveController],
      providers: [ReserveService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<ReserveController>(ReserveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
