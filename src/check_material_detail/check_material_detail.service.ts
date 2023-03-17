import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDetailDto } from './dto/create-check_material_detail.dto';
import { UpdateCheckMaterialDetailDto } from './dto/update-check_material_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterialDetail } from './entities/check_material_detail.entity';
import { Repository } from 'typeorm';
import { Material } from 'src/materials/entities/material.entity';
import { CheckMaterial } from 'src/check_material/entities/check_material.entity';

@Injectable()
export class CheckMaterialDetailService {
  constructor(
    @InjectRepository(CheckMaterialDetail)
    private CheckMaterialsDetailRepository: Repository<CheckMaterialDetail>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    @InjectRepository(CheckMaterial)
    private checkmaterialsRepository: Repository<CheckMaterial>,
  ) {}
  async create(createCheckMaterialDetailDto: CreateCheckMaterialDetailDto) {
    const material = await this.materialsRepository.findOneBy({
      id: createCheckMaterialDetailDto.materialId,
    });
    const checkmaterial = await this.checkmaterialsRepository.findOneBy({
      id: createCheckMaterialDetailDto.checkmaterialID,
    });
    const employees = await this.checkmaterialsRepository.findOne({
      relations: ['Check_Material_detail', 'Check_Material'],
      where: {
        checkmaterialdetails: {
          materials: { id: createCheckMaterialDetailDto.materialId },
        },
      },
    });
    const checkmaterialdetails: CheckMaterialDetail = new CheckMaterialDetail();
    checkmaterialdetails.name = createCheckMaterialDetailDto.name;
    checkmaterialdetails.qty_last = createCheckMaterialDetailDto.qty_last;
    checkmaterialdetails.qty_remain = createCheckMaterialDetailDto.qty_remain;
    checkmaterialdetails.qty_expire = createCheckMaterialDetailDto.qty_expire;
    checkmaterialdetails.materials = material;
    checkmaterialdetails.checkmaterials = checkmaterial;
    checkmaterialdetails.checkmaterials = employees;
    return this.CheckMaterialsDetailRepository.save(checkmaterialdetails);
  }

  findAll() {
    return this.CheckMaterialsDetailRepository.find({
      relations: ['checkmaterial', 'material', 'check_material.employees'],
    });
  }

  findOne(id: number) {
    const check_material_detail = this.checkmaterialsRepository.findOne({
      where: { id: id },
      relations: ['checkmaterial', 'material'],
    });
    if (!check_material_detail) {
      throw new NotFoundException();
    }
    return this.checkmaterialsRepository.findOne({ where: { id: id } });
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
