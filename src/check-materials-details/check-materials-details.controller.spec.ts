import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialsDetailsController } from './check-materials-details.controller';
import { CheckMaterialsDetailsService } from './check-materials-details.service';

describe('CheckMaterialsDetailsController', () => {
  let controller: CheckMaterialsDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckMaterialsDetailsController],
      providers: [CheckMaterialsDetailsService],
    }).compile();

    controller = module.get<CheckMaterialsDetailsController>(CheckMaterialsDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
