import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
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
      throw new NotFoundException('Material not found');
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
  async findMaterialByName(name: string) {
    const materials = await this.dataSource.query(
      'SELECT * FROM material WHERE mat_name LIKE ?',
      [`%${name}%`],
    );
    const matList = new Array<Material>();
    for (let i = 0; i < materials.length; i++) {
      const mat = new Material();
      mat.id = materials[i].mat_id;
      mat.name = materials[i].mat_name;
      mat.min_quantity = materials[i].min_quantity;
      mat.quantity = materials[i].mat_quantity;
      mat.price_per_unit = materials[i].mat_price_per_unit;
      mat.createdAt = materials[i].mat_start_date;
      mat.updatedAt = materials[i].mat_end_date;
      mat.deletedAt = materials[i].mat_deleted_at;
      mat.unit = materials[i].mat_unit;
      matList.push(mat);
    }
    return matList;
  }
}
