import { Test, TestingModule } from '@nestjs/testing';
import { SummarySalaryController } from './summary_salary.controller';
import { SummarySalaryService } from './summary_salary.service';

describe('SummarySalaryController', () => {
  let controller: SummarySalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarySalaryController],
      providers: [SummarySalaryService],
    }).compile();

    controller = module.get<SummarySalaryController>(SummarySalaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
