import { Test, TestingModule } from '@nestjs/testing';
import { CheckInOutsService } from './check_in_outs.service';

describe('CheckInOutsService', () => {
  let service: CheckInOutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckInOutsService],
    }).compile();

    service = module.get<CheckInOutsService>(CheckInOutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
