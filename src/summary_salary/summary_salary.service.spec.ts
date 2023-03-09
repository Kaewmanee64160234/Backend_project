import { Test, TestingModule } from '@nestjs/testing';
import { SummarySalaryService } from './summary_salary.service';

describe('SummarySalaryService', () => {
  let service: SummarySalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummarySalaryService],
    }).compile();

    service = module.get<SummarySalaryService>(SummarySalaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
