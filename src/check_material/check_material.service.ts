import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const Checkmaterial = await this.CheckMaterialsRepository.findOneBy({
      id: id,
    });
    if (!Checkmaterial) {
      throw new NotFoundException();
    } else {
      return Checkmaterial;
    }
  }

  async remove(id: number) {
    const Checkmaterial = await this.CheckMaterialsRepository.findOne({
      where: { id: id },
    });
    if (!Checkmaterial) {
      throw new NotFoundException();
    } else {
      await this.CheckMaterialsRepository.softRemove(Checkmaterial);
    }
    return Checkmaterial;
  }
}
