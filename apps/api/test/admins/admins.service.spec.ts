import AdminsService from '@admins/admins.service';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';

describe('AdminsService', () => {
  let service: AdminsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsService, PrismaService],
      imports: [PrismaModule],
      exports: [AdminsService]
    }).compile();

    service = module.get<AdminsService>(AdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
