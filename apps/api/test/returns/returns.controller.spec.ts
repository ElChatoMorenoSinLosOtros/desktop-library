import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReturnsController from '@returns/returns.controller';
import ReturnsService from '@returns/returns.service';

describe('ReturnsController', () => {
  let controller: ReturnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnsController],
      providers: [ReturnsService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<ReturnsController>(ReturnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
