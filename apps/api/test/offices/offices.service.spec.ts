import OfficesService from '@/offices/offices.service';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';

describe('OfficesService', () => {
  let service: OfficesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficesService, PrismaService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<OfficesService>(OfficesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
