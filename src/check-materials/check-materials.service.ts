import { Injectable } from '@nestjs/common';
import { CreateCheckMaterialDto } from './dto/create-check-material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check-material.dto';

@Injectable()
export class CheckMaterialsService {
  create(createCheckMaterialDto: CreateCheckMaterialDto) {
    return 'This action adds a new checkMaterial';
  }

  findAll() {
    return `This action returns all checkMaterials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkMaterial`;
  }

  update(id: number, updateCheckMaterialDto: UpdateCheckMaterialDto) {
    return `This action updates a #${id} checkMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkMaterial`;
  }
}
