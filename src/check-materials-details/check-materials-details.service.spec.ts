import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialsDetailsService } from './check-materials-details.service';

describe('CheckMaterialsDetailsService', () => {
  let service: CheckMaterialsDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckMaterialsDetailsService],
    }).compile();

    service = module.get<CheckMaterialsDetailsService>(CheckMaterialsDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
