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
      const check_in_out = new CheckInOut();
      check_in_out.date = new Date();
      check_in_out.time_in = new Date();
      check_in_out.employee = await this.employeeRepositiry.findOne({
        where: { id: createCheckInOutDto.employeeId },
      });
      //หาว่ามีsummaryมั้ย
      const summary_salaries = await this.summary_salaryRepositiry.find({
        relations: ['checkInOut', 'checkInOut.employee'],
        where: {
          checkInOut: { employee: { id: createCheckInOutDto.employeeId } },
        },
        order: { ss_date: 'DESC' },
      });
      console.log(summary_salaries);

      const summary_salary = summary_salaries.find(
        (ss) =>
          ss.ss_date.getMonth() + ' ' + ss.ss_date.getFullYear() ===
          check_in_out.date.getMonth() + ' ' + check_in_out.date.getFullYear(),
      );
      console.log(summary_salary);

      // if ไม่เจอsummary
      if (!summary_salary) {
        const summary_salary_ = new SummarySalary();
        summary_salary_.ss_date = new Date(createCheckInOutDto.time_in);
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

  async updated(id: number, updateCheckInOutDto: UpdateCheckInOutDto) {
    console.log(id);
    const check_in_out = await this.check_in_outsRepositiry.findOne({
      relations: ['summary_salary', 'employee'],
      where: { employee: { id: id } },
      order: { createdDate: 'DESC' },
    });
    console.log(check_in_out);
    // return check_in_out;
    if (check_in_out) {
      if (check_in_out.time_out === null) {
        check_in_out.time_out = new Date();
        check_in_out.total_hour =
          Math.abs(
            check_in_out.time_in.getTime() - check_in_out.time_out.getTime(),
          ) / 3600000;
        // console.log(check_in_out.total_hour);

        check_in_out.summary_salary.hour =
          check_in_out.summary_salary.hour + check_in_out.total_hour;
        check_in_out.summary_salary.salary =
          check_in_out.employee.hourly * check_in_out.summary_salary.hour;
        const updatedCheckInOut = {
          ...check_in_out,
        };
        await this.summary_salaryRepositiry.save(check_in_out.summary_salary);
        return await this.check_in_outsRepositiry.save(updatedCheckInOut);
      } else {
        throw new NotFoundException('You check out already');
      }
    } else {
      throw new NotFoundException('CheckinCheckout not found');
    }
  }
  async upDateData(id: number, updateCheckInOutDto: UpdateCheckInOutDto) {
    const check_in_out = await this.check_in_outsRepositiry.findOne({
      relations: ['summary_salary', 'employee'],
      where: { employee: { id: id } },
      order: { createdDate: 'DESC' },
    });
    if (check_in_out) {
      const update = {
        ...check_in_out,
        ...updateCheckInOutDto,
      };
      return await this.check_in_outsRepositiry.save(update);
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
      const summ = await this.summary_salaryRepositiry.findOne({
        relations: ['checkInOut', 'checkInOut.employee'],
        where: { checkInOut: { employee: { id: check_in_out.employee.id } } },
      });
      summ.hour = summ.hour - check_in_out.total_hour;
      summ.salary = summ.hour * check_in_out.employee.hourly;
      await this.summary_salaryRepositiry.save(summ);
      await this.check_in_outsRepositiry.softRemove(check_in_out);
    }
    return check_in_out;
  }
}
