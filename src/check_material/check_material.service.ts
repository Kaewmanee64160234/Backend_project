import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckMaterialDto } from './dto/create-check_material.dto';
import { UpdateCheckMaterialDto } from './dto/update-check_material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class CheckMaterialService {
  constructor(
    @InjectRepository(CheckMaterial)
    private CheckMaterialsRepository: Repository<CheckMaterial>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}
  async create(createCheckMaterialDto: CreateCheckMaterialDto) {
    const employee = await this.employeesRepository.findOneBy({
      id: createCheckMaterialDto.employeeId,
    });
    const checkMat: CheckMaterial = new CheckMaterial();
    checkMat.employees = employee;
    checkMat.date = createCheckMaterialDto.date;
    checkMat.time = createCheckMaterialDto.time;
    return await this.CheckMaterialsRepository.save(checkMat);
  }

  findAll() {
    return this.CheckMaterialsRepository.find({relations: ['employee']});
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
