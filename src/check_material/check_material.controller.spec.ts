import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialController } from './check_material.controller';
import { CheckMaterialService } from './check_material.service';

describe('CheckMaterialController', () => {
  let controller: CheckMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckMaterialController],
      providers: [CheckMaterialService],
    }).compile();

    controller = module.get<CheckMaterialController>(CheckMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
