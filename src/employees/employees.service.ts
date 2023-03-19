import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Employee)
    private readonly employeesRepositiry: Repository<Employee>,
    @InjectRepository(SummarySalary)
    private readonly summary_salaryRepositiry: Repository<SummarySalary>,
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

  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'name';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.employeesRepositiry.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: { [orderBy]: order },
      relations: ['check_in_outs', 'user'],
      take: take,
      skip: skip,
    });
    const lastPage = Math.ceil(total / take);
    return {
      data: result,
      count: total,
      currentPage: currentPage,
      lastPage: lastPage,
    };
  }

  async findOne(id: number) {
    const employee = await this.employeesRepositiry.findOne({
      relations: ['check_in_outs', 'user'],
      where: { id: id },
      order: { check_in_outs: { date: 'DESC' } },
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
  findCheckInCheckOut(employeeId: number) {
    const summary_salary = this.summary_salaryRepositiry.find({
      relations: ['checkInOut'],
      where: { checkInOut: { employee: { id: employeeId } } },
    });
    return summary_salary;
  }

  async findEmployeeByName(name: string) {
    try {
      const employee_ = await this.dataSource.query(
        'SELECT * FROM employee WHERE employee_name LIKE ?',
        [`%${name}%`],
      );
      const employees = new Array<Employee>();
      for (let i = 0; i < employee_.length; i++) {
        const employee = new Employee();
        employee.id = employee_[i].employee_id;
        employee.name = employee_[i].employee_name;
        employee.address = employee_[i].employee_address;
        employee.tel = employee_[i].employee_tel;
        employee.email = employee_[i].employee_email;
        employee.position = employee_[i].employee_position;
        employee.createdDate = employee_[i].created_date;
        employee.updatedDate = employee_[i].updated_date;
        employee.deletedDate = employee_[i].deleted_date;
        employee.hourly = employee_[i].employee_hourly_wage;
        employee.image = employee_[i].employee_image;
        employees.push(employee);
      }
      return employees;
    } catch (err) {
      console.log(err);
    }
  }
}
