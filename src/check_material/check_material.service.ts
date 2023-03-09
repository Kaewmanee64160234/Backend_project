import { Injectable } from '@nestjs/common';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckMaterialService {
  constructor(
    @InjectRepository(CheckMaterial)
    private CheckMaterialsRepository: Repository<CheckMaterial>,
  ) {}
  create(createCheckMaterialDto: CreateCheckMaterialDto) {
    return this.CheckMaterialsRepository.save(createCheckMaterialDto);
  }

  findAll() {
    return this.CheckMaterialsRepository.find();
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
