import OfficesController from '@/offices/offices.controller';
import OfficesService from '@/offices/offices.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OfficesController', () => {
  let controller: OfficesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficesController],
      providers: [OfficesService]
    }).compile();

    controller = module.get<OfficesController>(OfficesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
