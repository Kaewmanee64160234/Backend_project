import { Test, TestingModule } from '@nestjs/testing';
import { CheckInOutsController } from './check_in_outs.controller';
import { CheckInOutsService } from './check_in_outs.service';

describe('CheckInOutsController', () => {
  let controller: CheckInOutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckInOutsController],
      providers: [CheckInOutsService],
    }).compile();

    controller = module.get<CheckInOutsController>(CheckInOutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
