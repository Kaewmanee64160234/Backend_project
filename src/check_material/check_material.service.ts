import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import { Material } from 'src/materials/entities/material.entity';

@Injectable()
export class CheckMaterialService {
  constructor(
    @InjectRepository(CheckMaterial)
    private CheckMaterialsRepository: Repository<CheckMaterial>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(CheckMaterialDetail)
    private CheckMaterialDetailsRepository: Repository<CheckMaterialDetail>,
    @InjectRepository(Material)
    private MaterialsRepository: Repository<Material>,
  ) {}
  async create(createCheckMaterialDto: CreateCheckMaterialDto) {
    const employee = await this.employeesRepository.findOneBy({
      id: createCheckMaterialDto.employeeId,
    });
    const checkmaterial: CheckMaterial = new CheckMaterial();
    checkmaterial.employee = employee;
    checkmaterial.date = new Date();
    checkmaterial.time = new Date();
    const checkmaterials = await this.CheckMaterialsRepository.save(
      checkmaterial,
    );

    for (const cd of createCheckMaterialDto.checkmaterialdetail) {
      const checkmaterialdetail = new CheckMaterialDetail();
      const material = await this.MaterialsRepository.findOne({
        where: { name: checkmaterialdetail.name },
      });
      checkmaterialdetail.name = cd.name;
      checkmaterialdetail.material = material;
      checkmaterialdetail.qty_last = cd.qty_last;
      checkmaterialdetail.qty_remain = cd.qty_remain;
      checkmaterialdetail.qty_expire = cd.qty_expire;
      checkmaterialdetail.checkmaterials = checkmaterials;

      await this.CheckMaterialDetailsRepository.save(checkmaterialdetail);
    }
    await this.CheckMaterialsRepository.save(checkmaterial);
    return await this.CheckMaterialsRepository.findOne({
      where: { id: checkmaterial.id },
      relations: ['checkmaterialdetails'],
    });
  }

  findAll() {
    return this.CheckMaterialsRepository.find({
      relations: ['employee', 'checkmaterialdetails'],
    });
  }
  async findCheckByMatId(id: number) {
    try {
      const mat = await this.MaterialsRepository.findOne({
        where: { id:id },
        relations: ['checkmaterialdetails','checkmaterial']
      });
      if (mat) {
        return mat;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: number) {
    const checkmaterial = this.CheckMaterialsRepository.findOne({
      where: { id: id },
      relations: ['employee', 'checkmaterialdetails'],
    });
    if (!checkmaterial) {
      throw new NotFoundException();
    }
    return this.CheckMaterialsRepository.findOne({ where: { id: id } });
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
