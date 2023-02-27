import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialsRepository.save(createMaterialDto);
  }

  findAll() {
    return this.materialsRepository.find();
  }

  async findOne(id: number) {
    const material = await this.materialsRepository.findOneBy({ id: id });
    if (!material) {
      throw new NotFoundException('Material not found');
    } else {
      return material;
    }
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.materialsRepository.findOneBy({ id: id });
    if (!material) {
      throw new NotFoundException('Customer not found');
    } else {
      const updatedMaterial = {
        ...material,
        ...updateMaterialDto,
      };
      return this.materialsRepository.save(updatedMaterial);
    }
  }

  async remove(id: number) {
    const material = await this.materialsRepository.findOne({
      where: { id: id },
    });
    if (!material) {
      throw new NotFoundException();
    } else {
      await this.materialsRepository.softRemove(material);
    }
    return material;
  }
}
