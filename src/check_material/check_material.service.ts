import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import { Material } from 'src/materials/entities/material.entity';

@Injectable()
export class CheckMaterialService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
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
    const employee = await this.employeesRepository.findOne({
      where: { id: createCheckMaterialDto.employeeId },
      relations: ['checkmaterials'],
    });
    console.log(employee);
    if (employee) {
      let checkMat: CheckMaterial = new CheckMaterial();
      let matDetail = new CheckMaterialDetail();

      checkMat.employee = employee;
      checkMat.date = new Date(); // TODO: demo for backend
      // checkMat.time = new Date();
      checkMat = await this.checkMaterialsRepository.save(checkMat);

      for (const detail of createCheckMaterialDto.checkMaterialDetails) {
        const mat = await this.materialRepository.findOne({
          where: { name: detail.name },
          relations: ['checkmaterialdetails'],
        });
        if (mat) {
          console.log(' found');
          matDetail.name = mat.name;
          matDetail.material = mat;
          matDetail.qty_expire = detail.qty_expire;
          matDetail.qty_last = detail.qty_last;
          matDetail.qty_remain = detail.qty_last - detail.qty_expire;
          if (matDetail.qty_remain <= 0) {
            matDetail.qty_remain = 0;
          }
          matDetail.createdAt = new Date();
          matDetail.checkmaterial = checkMat;
          mat.quantity = detail.qty_last;
          matDetail = await this.CheckMaterialDetailsRepository.save(matDetail);
        }
      }
      checkMat = await this.checkMaterialsRepository.save(checkMat);
      return checkMat;
    }
  }

  async findAll(query) {
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

  showBillAboutMat = async (id: string) => {
    const mat = await this.materialRepository.findOne({ where: { id: +id } });
    const bills = this.CheckMaterialDetailsRepository.find({
      where: { name: mat.name },
      relations: ['checkmaterial.checkmaterialdetails'],
    });
    return bills;
  };
  async findCheckMaterialByID(id: string) {
    try {
      const checkmaterial_ = await this.dataSource.query(
        'SELECT * FROM check_material WHERE check_mat_id LIKE ?',
        [`%${id}%`],
      );
      const checkmaterials = new Array<CheckMaterial>();
      for (let i = 0; i < checkmaterial_.length; i++) {
        const checkmaterial = new CheckMaterial();
        checkmaterial.id = checkmaterial_[i].checkmaterial_id;
        checkmaterial.employee = checkmaterial_[i].checkmaterial_employee;
        checkmaterial.date = checkmaterial_[i].checkmaterail_date;
        checkmaterial.createdAt = checkmaterial_[i].created_date;
        checkmaterial.deletedAt = checkmaterial_[i].deleted_date;
        checkmaterial.checkmaterialdetails =
          checkmaterial_[i].checkmaterail_checmaterialDetail;
        checkmaterials.push(checkmaterial);
      }
      return checkmaterials;
    } catch (err) {
      console.log(err);
    }
  }
}
