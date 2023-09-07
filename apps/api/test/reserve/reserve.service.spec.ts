import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReserveService from '@reserve/reserve.service';

describe('ReserveService', () => {
  let service: ReserveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<ReserveService>(ReserveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
