import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckInOutDto } from './dto/create-check_in_out.dto';
import { UpdateCheckInOutDto } from './dto/update-check_in_out.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInOut } from './entities/check_in_out.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CheckInOutsService {
  constructor(
    @InjectRepository(CheckInOut)
    private readonly check_in_outsRepositiry: Repository<CheckInOut>,
  ) {}
  async create(createCheckInOutDto: CreateCheckInOutDto) {
    const employee = await this.check_in_outsRepositiry.save(
      createCheckInOutDto,
    );
    return employee;
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

  async update(id: number, updateCheckInOutDto: UpdateCheckInOutDto) {
    const check_in_out = await this.check_in_outsRepositiry.findOneBy({
      id: id,
    });
    if (!check_in_out) {
      throw new NotFoundException('Checkinout not found');
    } else {
      const updateCheckInOut = {
        ...check_in_out,

        ...updateCheckInOutDto,
      };

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
