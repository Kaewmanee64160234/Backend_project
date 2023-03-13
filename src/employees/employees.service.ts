import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepositiry: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const user = await this.employeesRepositiry.save(createEmployeeDto);
    return user;
  }

  async emplyeeLogin(name: string, email: string) {
    const employee = await this.employeesRepositiry.findOne({
      where: { name: name },
    });
    if (employee) {
      if (employee.email === email) {
        return employee;
      } else {
        throw new NotFoundException('Employee not found');
      }
    } else {
      throw new NotFoundException('Employee not found');
    }
  }

  async findAll() {
    const employees = await this.employeesRepositiry.find({
      relations: ['check_in_outs', 'user'],
    });
    return employees;
  }

  async findOne(id: number) {
    const employee = await this.employeesRepositiry.findOne({
      relations: ['check_in_outs', 'user'],
      where: { id: id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    } else {
      return employee;
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepositiry.findOneBy({ id: id });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    } else {
      const updatedEmployee = {
        ...employee,

        ...updateEmployeeDto,
      };

      return this.employeesRepositiry.save(updatedEmployee);
    }
  }

  async remove(id: number) {
    const employee = await this.employeesRepositiry.findOne({
      where: { id: id },
    });
    if (!employee) {
      throw new NotFoundException();
    } else {
      await this.employeesRepositiry.softRemove(employee);
    }
    return employee;
  }
}
