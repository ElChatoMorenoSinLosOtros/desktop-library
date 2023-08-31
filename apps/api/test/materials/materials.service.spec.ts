import MaterialsService from '@materials/materials.service';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';

describe('MaterialsService', () => {
  let service: MaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialsService, PrismaService],
      imports: [PrismaModule],
      exports: [MaterialsService]
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
