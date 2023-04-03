import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDetailDto } from './dto/create-check_material_detail.dto';
import { UpdateCheckMaterialDetailDto } from './dto/update-check_material_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterialDetail } from './entities/check_material_detail.entity';
import { Repository } from 'typeorm';
import { Material } from 'src/materials/entities/material.entity';

@Injectable()
export class CheckMaterialDetailService {
  constructor(
    @InjectRepository(CheckMaterialDetail)
    private CheckMaterialsDetailRepository: Repository<CheckMaterialDetail>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}
  async create(createCheckMaterialDetailDto: CreateCheckMaterialDetailDto) {
    const cmd = new CheckMaterialDetail();
    cmd.name = createCheckMaterialDetailDto.name;
    cmd.qty_last = createCheckMaterialDetailDto.qty_last;
    cmd.qty_remain = createCheckMaterialDetailDto.qty_remain;
    cmd.qty_expire = createCheckMaterialDetailDto.qty_expire;

    const material = new Material();
    material.name = createCheckMaterialDetailDto.name_material;
    material.min_quantity = createCheckMaterialDetailDto.min_quantity;
    material.quantity = createCheckMaterialDetailDto.quantity;
    material.unit = createCheckMaterialDetailDto.unit;
    material.price_per_unit = createCheckMaterialDetailDto.price_per_unit;
    const mtr = await this.materialsRepository.save(material);
    cmd.material = mtr;
    return await this.CheckMaterialsDetailRepository.save(cmd);
  }

  findAll() {
    return this.CheckMaterialsDetailRepository.find({
      relations: ['material'],
    });
  }

  findOne(id: number) {
    return this.CheckMaterialsDetailRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const Checkmaterialdetail =
      await this.CheckMaterialsDetailRepository.findOne({
        where: { id: id },
      });
    if (!Checkmaterialdetail) {
      throw new NotFoundException();
    } else {
      await this.CheckMaterialsDetailRepository.softRemove(Checkmaterialdetail);
    }
    return Checkmaterialdetail;
  }
}
