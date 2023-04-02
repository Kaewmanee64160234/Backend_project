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
    private checkMaterialsRepository: Repository<CheckMaterial>,
    @InjectRepository(CheckMaterialDetail)
    private CheckMaterialDetailsRepository: Repository<CheckMaterialDetail>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}
  async create(createCheckMaterialDto: CreateCheckMaterialDto) {
    const employee = await this.employeesRepository.findOneBy({
      id: createCheckMaterialDto.employeeId,
    });
    let checkMat: CheckMaterial = new CheckMaterial();
    let matDetail = new CheckMaterialDetail();

    checkMat.employee = employee;
    checkMat.date = new Date(); // TODO: demo for backend
    checkMat.time = new Date();
    checkMat = await this.checkMaterialsRepository.save(checkMat);

    for (const detail of createCheckMaterialDto.checkMaterialDetails) {
      const mat = await this.materialRepository.findOne({
        where: { name: detail.name },
        relations: ['checkmaterialdetails'],
      });
      if (mat) {
        console.log(' found');
        matDetail.name = mat.name;
        matDetail.materials = mat;
        matDetail.qty_expire = detail.qty_expire;
        matDetail.qty_last = detail.qty_last;
        matDetail.qty_remain = detail.qty_remain;
        matDetail.createdAt = new Date();
        matDetail.checkmaterials = checkMat;
        mat.quantity = detail.qty_last;
        matDetail = await this.CheckMaterialDetailsRepository.save(matDetail);

        mat.checkmaterialdetails.push(matDetail);

        await this.materialRepository.save(mat);
      }
    }

    checkMat = await this.checkMaterialsRepository.save(checkMat);
    return checkMat;
  }

  findAll() {
    return this.checkMaterialsRepository.find({
      relations: ['employee', 'checkmaterialdetails'],
    });
  }

  async findOne(id: number) {
    const check = this.checkMaterialsRepository.findOne({
      where: { id: id },
      relations: ['employee', 'checkmaterialdetails'],
    });
    if (!check) {
      throw new NotFoundException();
    }
    return this.checkMaterialsRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const Checkmaterial = await this.checkMaterialsRepository.findOne({
      where: { id: id },
    });
    if (!Checkmaterial) {
      throw new NotFoundException();
    } else {
      await this.checkMaterialsRepository.softRemove(Checkmaterial);
    }
    return Checkmaterial;
  }
}
