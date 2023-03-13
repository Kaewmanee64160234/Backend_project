import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckInOutDto } from './dto/create-check_in_out.dto';
import { UpdateCheckInOutDto } from './dto/update-check_in_out.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInOut } from './entities/check_in_out.entity';
import { Repository } from 'typeorm/repository/Repository';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';
import * as moment from 'moment';
import { Employee } from 'src/employees/entities/employee.entity';
@Injectable()
export class CheckInOutsService {
  constructor(
    @InjectRepository(CheckInOut)
    private readonly check_in_outsRepositiry: Repository<CheckInOut>,
    @InjectRepository(SummarySalary)
    private readonly summary_salaryRepositiry: Repository<SummarySalary>,
    @InjectRepository(Employee)
    private readonly employeeRepositiry: Repository<Employee>,
  ) {}
  async create(createCheckInOutDto: CreateCheckInOutDto) {
    try {
      // const emp = await this.employeeRepositiry.findOne({
      //   relations: ['check_in_outs'],
      //   where: { id: createCheckInOutDto.employeeId },
      // });
      const summary_salary = await this.summary_salaryRepositiry.findOne({
        relations: ['checkInOut', 'checkInOut.employee'],
        where: {
          checkInOut: { employee: { id: createCheckInOutDto.employeeId } },
        },
      });
      console.log(summary_salary);
      const check_in_out = new CheckInOut();
      check_in_out.date = new Date();
      check_in_out.time_in = new Date();
      check_in_out.employee = await this.employeeRepositiry.findOne({
        where: { id: createCheckInOutDto.employeeId },
      });
      if (!summary_salary) {
        const summary_salary_ = new SummarySalary();
        const sum_ = await this.summary_salaryRepositiry.save(summary_salary_);
        check_in_out.summary_salary = sum_;
        await this.check_in_outsRepositiry.save(check_in_out);
        return check_in_out;
      } else {
        check_in_out.summary_salary = summary_salary;
        return await this.check_in_outsRepositiry.save(check_in_out);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(option) {
    const employees = await this.check_in_outsRepositiry.find(option);
    return employees;
  }

  async findOne(id: number) {
    const check_in_out = await this.check_in_outsRepositiry.findOneBy({
      id: id,
    });
    if (!check_in_out) {
      throw new NotFoundException('CheckinCheckout not found');
    } else {
      return check_in_out;
    }
  }
  async updated(id: number) {
    const check_in_out = await this.check_in_outsRepositiry.findOne({
      relations: ['summary_salary', 'employee'],
      where: { employee: { id: id } },
      order: { createdDate: 'DESC' },
    });
    // console.log(check_in_out);
    // return check_in_out;
    if (check_in_out) {
      if (check_in_out.time_out === null) {
        check_in_out.time_out = new Date();
        check_in_out.total_hour =
          Math.abs(
            check_in_out.time_in.getTime() - check_in_out.time_out.getTime(),
          ) / 3600000;

        check_in_out.summary_salary.hour =
          check_in_out.summary_salary.hour + check_in_out.total_hour;
        const updatedCheckInOut = {
          ...check_in_out,
        };
        await this.summary_salaryRepositiry.save(check_in_out.summary_salary);
        return await this.check_in_outsRepositiry.save(updatedCheckInOut);
      } else {
        throw new Error('You check out already');
      }
    } else {
      throw new NotFoundException('CheckinCheckout not found');
    }
  }

  async remove(id: number) {
    const check_in_out = await this.check_in_outsRepositiry.findOneBy({
      id: id,
    });
    if (!check_in_out) {
      throw new NotFoundException('Checkinout not found');
    } else {
      await this.check_in_outsRepositiry.softRemove(check_in_out);
    }
    return check_in_out;
  }
}
