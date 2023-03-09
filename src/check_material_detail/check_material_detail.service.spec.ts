import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialDetailService } from './check_material_detail.service';

describe('CheckMaterialDetailService', () => {
  let service: CheckMaterialDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckMaterialDetailService],
    }).compile();

    service = module.get<CheckMaterialDetailService>(CheckMaterialDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
