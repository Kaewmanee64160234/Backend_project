import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialService } from './check_material.service';

describe('CheckMaterialService', () => {
  let service: CheckMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckMaterialService],
    }).compile();

    service = module.get<CheckMaterialService>(CheckMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
