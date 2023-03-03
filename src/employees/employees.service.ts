import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepositiry: Repository<Employee>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    console.log(createEmployeeDto);
    return await this.employeesRepositiry.save(createEmployeeDto);
  }

  findAll() {
    return this.employeesRepositiry.find();
  }

  findOne(id: number) {
    return this.employeesRepositiry.findOne({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepositiry.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException();
    }
    const updateEmployee = { ...employee, ...updateEmployeeDto };
    return this.employeesRepositiry.save(updateEmployee);
  }

  async remove(id: number) {
    const employee = await this.employeesRepositiry.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException();
    }

    return this.employeesRepositiry.softRemove(employee);
  }
}
