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
      // const summary_salary = await this.summary_salaryRepositiry.findOne({
      //   relations: ['employee', 'check_in_out'],where:{id}
      // });
      // console.log(summary_salary);
      const check_in_out = new CheckInOut();
      // if (summary_salary) {
      //   const employee = await this.employeeRepositiry.findOne({
      //     where: { id: createCheckInOutDto.employeeId },
      //   });
      //   check_in_out.time_in = createCheckInOutDto.time_in;
      //   check_in_out.date = createCheckInOutDto.date;
      //   check_in_out.employee = employee;
      //   check_in_out.total_hour = createCheckInOutDto.total_hour;
      //   check_in_out.summary_salary = summary_salary;
      //   summary_salary.checkInOut.push(check_in_out);
      //   await this.summary_salaryRepositiry.save(summary_salary);
      //   await this.check_in_outsRepositiry.save(check_in_out);
      //   return check_in_out;
      // } else {
      const employee = await this.employeeRepositiry.findOne({
        where: { id: createCheckInOutDto.employeeId },
      });
      const summary_salary_ = new SummarySalary();

      //checkin-out
      check_in_out.time_in = createCheckInOutDto.time_in;
      check_in_out.employee = employee;
      check_in_out.total_hour = createCheckInOutDto.total_hour;
      check_in_out.summary_salary = summary_salary_;
      check_in_out.time_in = new Date();
      check_in_out.time_out = new Date();
      check_in_out.date = new Date();
      //summary_salary
      summary_salary_.hour = createCheckInOutDto.total_hour;
      summary_salary_.ss_date = new Date();
      summary_salary_.salary = 500;
      // summary_salary_.checkInOut.push(check_in_out);
      await this.summary_salaryRepositiry.save(summary_salary_);
      await this.check_in_outsRepositiry.save(check_in_out);
      return check_in_out;
      // }
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
    const check_in_out = await this.check_in_outsRepositiry.findOne({
      where: { id: id },
    });
    const updatedCheckInOut = {
      ...check_in_out,
      ...updateCheckInOutDto,
    };
    if (check_in_out) {
      return await this.check_in_outsRepositiry.save(updatedCheckInOut);
    } else {
      throw new NotFoundException('CheckinCheckout not found');
    }
  }
  // async updateDateCheckout(
  //   id: number,
  //   updateCheckInOutDto: UpdateCheckInOutDto,
  // ) {
  //   const check_in_out = await this.check_in_outsRepositiry.findOneBy({
  //     id: id,
  //   });
  //   if (!check_in_out) {
  //     throw new NotFoundException('Checkinout not found');
  //   } else {
  //     updateCheckInOutDto.time_out = moment().format('YYYY-MM-DD HH:mm:ss');
  //     const timecheckIn = parseInt(
  //       updateCheckInOutDto.time_in.substring(11, 13),
  //     );
  //     const timecheckOut = parseInt(
  //       updateCheckInOutDto.time_out.substring(11, 13),
  //     );
  //     const totalHour = timecheckOut - timecheckIn;
  //     updateCheckInOutDto.total_hour = totalHour;
  //     const updateCheckInOut = {
  //       ...check_in_out,
  //       ...updateCheckInOutDto,
  //     };
  // const summary = this.summaryRepository
  //   .createQueryBuilder('CheckInOut')
  //   .leftJoinAndSelect(
  //     SummarySalary,
  //     'summary_salary.id = check_in_out.summary_salary',
  //   )
  //   .where('check_in_out.time_in = :time_in', {
  //     time_in: updateCheckInOutDto.time_in,
  //   })
  //   .orderBy('check_in_out.time_in', 'DESC')
  //   .getOne();
  // console.log(summary);
  //     return this.check_in_outsRepositiry.save(updateCheckInOut);
  //   }
  // }

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
