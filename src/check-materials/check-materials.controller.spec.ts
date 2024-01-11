import { Test, TestingModule } from '@nestjs/testing';
import { CheckMaterialsController } from './check-materials.controller';
import { CheckMaterialsService } from './check-materials.service';

describe('CheckMaterialsController', () => {
  let controller: CheckMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckMaterialsController],
      providers: [CheckMaterialsService],
    }).compile();

    controller = module.get<CheckMaterialsController>(CheckMaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
