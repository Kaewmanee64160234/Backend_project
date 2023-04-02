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
    const checkMat: CheckMaterial = new CheckMaterial();
    checkMat.employees = employee;
    checkMat.date = new Date(); // TODO: demo for backend
    checkMat.time = new Date();
    checkMat.checkmaterialdetails = createCheckMaterialDto.checkMaterialDetails;
    for (const detail of checkMat.checkmaterialdetails) {
      const matDetail = new CheckMaterialDetail();
      const mat = await this.materialRepository.findOne({
        where: { name: detail.name },
        relations: ['checkmaterialdetails'],
      });
      if (mat) {
        // console.log(' found');
        matDetail.name = mat.name;
        matDetail.materials = mat;
        matDetail.qty_expire = detail.qty_expire;
        matDetail.qty_last = detail.qty_last;
        matDetail.qty_remain = detail.qty_remain;
        matDetail.createdAt = new Date();
        mat.quantity = detail.qty_last;
        const matDetail_ = await this.CheckMaterialDetailsRepository.save(
          matDetail,
        );
        mat.checkmaterialdetails.push(matDetail_);
        await this.materialRepository.save(mat);
      }
    }
    const checkMat_ = await this.CheckMaterialsRepository.save(checkMat);
    return checkMat_;
  }

  findAll() {
    return this.CheckMaterialsRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number) {
    const check = this.CheckMaterialsRepository.findOne({
      where: { id: id },
      relations: ['employee'],
    });
    if (!check) {
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
