import { Injectable } from '@nestjs/common';
import { CreateCheckMaterialsDetailDto } from './dto/create-check-materials-detail.dto';
import { UpdateCheckMaterialsDetailDto } from './dto/update-check-materials-detail.dto';

@Injectable()
export class CheckMaterialsDetailsService {
  create(createCheckMaterialsDetailDto: CreateCheckMaterialsDetailDto) {
    return 'This action adds a new checkMaterialsDetail';
  }

  findAll() {
    return `This action returns all checkMaterialsDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkMaterialsDetail`;
  }

  update(id: number, updateCheckMaterialsDetailDto: UpdateCheckMaterialsDetailDto) {
    return `This action updates a #${id} checkMaterialsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkMaterialsDetail`;
  }
}
