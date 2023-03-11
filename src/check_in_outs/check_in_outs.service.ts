import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckInOutDto } from './dto/create-check_in_out.dto';
import { UpdateCheckInOutDto } from './dto/update-check_in_out.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInOut } from './entities/check_in_out.entity';
import { Repository } from 'typeorm/repository/Repository';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';
import * as moment from 'moment';
@Injectable()
export class CheckInOutsService {
  constructor(
    @InjectRepository(CheckInOut)
    private readonly check_in_outsRepositiry: Repository<CheckInOut>,
  ) {}
  async create(createCheckInOutDto: CreateCheckInOutDto) {
    const check_in_out = await this.check_in_outsRepositiry.save(
      createCheckInOutDto,
    );
    return check_in_out;
  }

  async findAll() {
    const employees = await this.check_in_outsRepositiry.find();
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
  async updateDateCheckout(
    id: number,
    updateCheckInOutDto: UpdateCheckInOutDto,
  ) {
    const check_in_out = await this.check_in_outsRepositiry.findOneBy({
      id: id,
    });
    if (!check_in_out) {
      throw new NotFoundException('Checkinout not found');
    } else {
      updateCheckInOutDto.time_out = moment().format('YYYY-MM-DD HH:mm:ss');
      const timecheckIn = parseInt(
        updateCheckInOutDto.time_in.substring(11, 13),
      );
      const timecheckOut = parseInt(
        updateCheckInOutDto.time_out.substring(11, 13),
      );
      const totalHour = timecheckOut - timecheckIn;
      updateCheckInOutDto.total_hour = totalHour;
      const updateCheckInOut = {
        ...check_in_out,
        ...updateCheckInOutDto,
      };
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
      return this.check_in_outsRepositiry.save(updateCheckInOut);
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
