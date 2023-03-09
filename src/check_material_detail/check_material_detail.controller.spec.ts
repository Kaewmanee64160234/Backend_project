import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialDetailController } from './check_material_detail.controller';
import { CheckMaterialDetailService } from './check_material_detail.service';

describe('CheckMaterialDetailController', () => {
  let controller: CheckMaterialDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckMaterialDetailController],
      providers: [CheckMaterialDetailService],
    }).compile();

    controller = module.get<CheckMaterialDetailController>(
      CheckMaterialDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
